import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// 本地留言存储文件路径
const messagesFilePath = path.join(process.cwd(), "inquiry-messages.json");

// 获取留言列表接口
export async function GET() {
  try {
    let messages = [];
    if (fs.existsSync(messagesFilePath)) {
      const fileContent = fs.readFileSync(messagesFilePath, "utf8");
      messages = JSON.parse(fileContent);
    }
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error("GET inquiry-messages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 提交留言与发送邮件接口
export async function POST(request: Request) {
  let newMessageSaved = false;
  let body: any = {};
  
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON format." }, { status: 400 });
  }

  const { 
    email, 
    company, 
    quantity, 
    scenario, 
    color, 
    process: printProcess, 
    note, 
    logoName, 
    logoDataUrl, 
    submittedAt 
  } = body;

  // 基础参数校验
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  // 1. 无论邮件发送成功与否，首先将新留言保存到本地 JSON 文件中，确保询盘数据永不丢失！
  try {
    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email,
      company: company || "",
      quantity: quantity || "1000",
      scenario: scenario || "jewelry",
      color: color || "cream",
      process: printProcess || "gold",
      note: note || "",
      logoName: logoName || "None",
      logoDataUrl: logoDataUrl || null,
      submittedAt: submittedAt || new Date().toISOString()
    };

    let currentMessages = [];
    if (fs.existsSync(messagesFilePath)) {
      try {
        const fileContent = fs.readFileSync(messagesFilePath, "utf8");
        currentMessages = JSON.parse(fileContent);
      } catch (e) {
        console.error("Failed to parse local messages JSON, resetting...", e);
      }
    }
    
    currentMessages.unshift(newMessage); // 最新提交的排在最前
    fs.writeFileSync(messagesFilePath, JSON.stringify(currentMessages, null, 2), "utf8");
    newMessageSaved = true;
  } catch (localSaveError) {
    console.error("Failed to save message to local JSON database:", localSaveError);
  }

  // 获取发信环境变量
  const smtpHost = process.env.SMTP_HOST || "smtp.qq.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const receiverEmail = process.env.RECEIVER_EMAIL || "237862623@qq.com";

  // 检查发信服务是否配置
  if (!smtpUser || !smtpPass || smtpPass.trim() === "" || smtpPass.includes("your_qq_mail")) {
    console.warn("SMTP credentials are not configured in .env.local");
    // 虽然邮件服务未配置，但因为前面本地保存成功了，我们告诉用户留言已在本地存下，但邮件未能发送
    return NextResponse.json(
      { 
        success: true, // 返回成功以让前端展示成功界面，但附带警告说明
        localSaved: true,
        warning: "由于服务器的 SMTP 服务未配置或授权码为空，系统未能给您的 QQ 邮箱发送通知邮件。但买家留言已成功在本地后台系统中存盘！"
      }, 
      { status: 200 }
    );
  }

  // 翻译或映射表单值以提高邮件可读性
  const scenarioMap: Record<string, string> = {
    jewelry: "珠宝首饰袋 (Jewelry)",
    cosmetics: "化妆品袋 (Cosmetics)",
    gifts: "礼品袋 (Gifts)",
    tech: "数码配件袋 (Tech)",
    watches: "手表保护袋 (Watches)",
  };

  const colorMap: Record<string, string> = {
    cream: "奶油白 (Cream)",
    pink: "蔷薇粉 (Pink)",
    sage: "鼠尾草绿 (Sage)",
    charcoal: "炭黑色 (Charcoal)",
    camel: "驼色 (Camel)",
  };

  const processMap: Record<string, string> = {
    gold: "烫金 (Gold)",
    silver: "烫银 (Silver)",
    debossed: "压痕 (Debossed)",
  };

  const displayScenario = scenarioMap[scenario] || scenario || "未指定";
  const displayColor = colorMap[color] || color || "未指定";
  const displayProcess = processMap[printProcess] || printProcess || "未指定";

  // 格式化时间 (使用北京时间)
  const formattedDate = submittedAt 
    ? new Date(submittedAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    : new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

  // 邮件主题
  const emailSubject = `【新询盘通知】来自客户 ${company || "匿名公司"} (${email})`;

  // 邮件 HTML 内容
  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ebdcb9; border-radius: 16px; padding: 32px; background-color: #faf9f6; color: #2b261f; box-shadow: 0 4px 12px rgba(43,38,31,0.05);">
      <div style="text-align: center; border-bottom: 2px solid #b48a50; padding-bottom: 20px; margin-bottom: 24px;">
        <h2 style="margin: 0; color: #b48a50; font-size: 22px; font-weight: 700; letter-spacing: -0.01em;">B2B 网站新询盘留言</h2>
        <p style="margin: 6px 0 0 0; color: #8c7e6e; font-size: 14px;">您收到了来自全球买家提交的定制化询价单</p>
      </div>

      <h3 style="color: #2b261f; font-size: 16px; margin-top: 0; margin-bottom: 16px; border-left: 4px solid #b48a50; padding-left: 8px;">客户信息与需求清单</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 10px 0; font-weight: 600; color: #7a6e60; width: 120px;">客户邮箱:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #2b261f;"><a href="mailto:${email}" style="color: #b48a50; text-decoration: underline;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 10px 0; font-weight: 600; color: #7a6e60;">公司名称:</td>
          <td style="padding: 10px 0; color: #2b261f; font-weight: 500;">${company || "未提供公司名"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 10px 0; font-weight: 600; color: #7a6e60;">询价数量:</td>
          <td style="padding: 10px 0; color: #2b261f; font-weight: 700;">${quantity} pcs</td>
        </tr>
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 10px 0; font-weight: 600; color: #7a6e60;">应用行业:</td>
          <td style="padding: 10px 0; color: #2b261f;">${displayScenario}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 10px 0; font-weight: 600; color: #7a6e60;">定制颜色:</td>
          <td style="padding: 10px 0; color: #2b261f;">${displayColor}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 10px 0; font-weight: 600; color: #7a6e60;">Logo工艺:</td>
          <td style="padding: 10px 0; color: #2b261f;">${displayProcess}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 10px 0; font-weight: 600; color: #7a6e60;">Logo文件:</td>
          <td style="padding: 10px 0; color: #2b261f; font-weight: 500;">
            ${logoName !== "None" ? `<span style="background-color: #ebdcb9; color: #2b261f; padding: 2px 8px; border-radius: 4px; font-size: 13px;">📎 ${logoName}</span>` : '<span style="color: #a89f91;">未上传</span>'}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 10px 0; font-weight: 600; color: #7a6e60;">提交时间:</td>
          <td style="padding: 10px 0; color: #7a6e60; font-size: 14px;">${formattedDate}</td>
        </tr>
      </table>

      <div style="background-color: #ffffff; border: 1px solid #f2ede4; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 10px 0; color: #7a6e60; font-size: 14px; font-weight: 600;">客户详细留言:</h4>
        <p style="margin: 0; color: #2b261f; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${note || "该买家无额外留言说明。"}</p>
      </div>

      ${logoDataUrl ? `
        <div style="margin-top: 24px;">
          <h4 style="margin: 0 0 12px 0; color: #7a6e60; font-size: 14px; font-weight: 600;">Logo 预览图：</h4>
          <div style="background-color: #ffffff; border: 1px solid #f2ede4; padding: 16px; border-radius: 12px; text-align: center;">
            <img src="cid:logo_preview" alt="Logo Preview" style="max-width: 100%; max-height: 240px; object-fit: contain;" />
          </div>
        </div>
      ` : ""}

      <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #e1d8cc; text-align: center; color: #8c7e6e; font-size: 12px; line-height: 1.5;">
        <p style="margin: 0 0 4px 0;">如果您想给客户回复邮件，可以直接点击此邮件的【回复】按钮。</p>
        <p style="margin: 0;">此邮件由系统安全层在询盘提交时自动发送，请勿在发件人地址中删除或更改。</p>
      </div>
    </div>
  `;

  // 构建附件
  const attachments = [];
  if (logoDataUrl && logoName !== "None") {
    attachments.push({
      filename: logoName,
      path: logoDataUrl,
      cid: "logo_preview", // 通过 cid 将其嵌入 HTML
    });
  }

  // 发送邮件选项
  const mailOptions = {
    from: `"${company || "询盘系统"}" <${smtpUser}>`,
    to: receiverEmail,
    replyTo: email,
    subject: emailSubject,
    html: emailHtml,
    attachments: attachments,
  };

  // 2. 尝试使用发信网络发送邮件
  try {
    // 默认使用 465 端口
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully on port ${smtpPort}.`);
    return NextResponse.json({ success: true, localSaved: true });
  } catch (firstError: any) {
    console.warn(`First email attempt failed on port ${smtpPort}:`, firstError.message);
    
    // 如果是 465 端口失败，回退到 587 端口尝试
    if (smtpPort === 465) {
      console.log("Attempting fallback to port 587 (STARTTLS)...");
      try {
        const fallbackTransporter = nodemailer.createTransport({
          host: smtpHost,
          port: 587,
          secure: false, // 587 需要关闭 secure 开启 STARTTLS
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 5000,
          greetingTimeout: 5000,
          socketTimeout: 5000,
        });
        
        await fallbackTransporter.sendMail(mailOptions);
        console.log("Email sent successfully on fallback port 587.");
        return NextResponse.json({ success: true, localSaved: true });
      } catch (fallbackError: any) {
        console.error("Fallback attempt on port 587 also failed:", fallbackError.message);
        
        // 两个端口都连不通网络，但因为前面留言已经成功存入本地文件，我们依然向前端返回成功，但带上警告说明
        return NextResponse.json({ 
          success: true, 
          localSaved: true,
          warning: "留言已成功存入本地后台，但由于您的服务器网络限制，未能成功发送 QQ 邮件通知。请检查您本地的代理工具或安全策略。"
        });
      }
    } else {
      // 非 465 端口，直接返回本地保存成功，但附加警告
      return NextResponse.json({
        success: true,
        localSaved: true,
        warning: `留言已成功存入本地后台。邮件发送失败，详情: ${firstError.message}`
      });
    }
  }
}

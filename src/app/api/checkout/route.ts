import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      isSamplePack, 
      pouchColor, 
      processType, 
      logoSize, 
      logoY, 
      logoSrc, 
      quantity, 
      unitPrice, 
      totalPrice 
    } = data;

    // 基础防呆校验
    if (isSamplePack) {
      // 样品包校验
      const metadata = {
        order_type: "free_sample_pack",
        postage_fee: "$9.99",
        included_samples: "Cream, Pink, Sage, Charcoal, Camel (Gold, Silver, Debossed)",
        status: "waiting_payment"
      };

      return NextResponse.json({
        success: true,
        message: "样品包订单创建成功！即将跳转至收银台支付邮费。",
        isSamplePack: true,
        orderId: "SMP-" + Math.floor(Math.random() * 900000 + 100000),
        checkoutUrl: "/mock-checkout", // 未来对接真实 Stripe 时此字段为 stripe.session.url
        stripeMetadata: metadata,
        summary: {
          itemName: "首饰袋多工艺样品包 (Free Sample Pack)",
          qty: 1,
          price: 0.00,
          shipping: 9.99,
          grandTotal: 9.99
        }
      });
    }

    // 大货订单校验
    if (!quantity || quantity < 100) {
      return NextResponse.json(
        { success: false, error: "大货定制订单起订量不得低于 100 个！" },
        { status: 400 }
      );
    }

    // 打包透传给 Stripe 的 Metadata 参数
    const stripeMetadata = {
      order_type: "bulk_custom_pouch",
      pouch_color_id: pouchColor.id,
      pouch_color_name: pouchColor.name,
      printing_process_id: processType.id,
      printing_process_name: processType.name,
      logo_scale_percent: `${logoSize}%`,
      logo_position_y_percent: `${logoY}%`,
      logo_file_preview_truncated: logoSrc ? (logoSrc.substring(0, 100) + "...") : "Default Bameme Logo",
      bulk_quantity: quantity.toString(),
      calculated_unit_price: `$${unitPrice.toFixed(2)}`,
      calculated_total_price: `$${totalPrice.toFixed(2)}`
    };

    return NextResponse.json({
      success: true,
      message: "大货定制订单已确认，定制参数及设计稿 Metadata 已成功打包！",
      isSamplePack: false,
      orderId: "BLK-" + Math.floor(Math.random() * 900000 + 100000),
      checkoutUrl: "/mock-checkout",
      stripeMetadata: stripeMetadata,
      summary: {
        itemName: `定制超细纤维珠宝袋 (${pouchColor.name} + ${processType.name})`,
        qty: quantity,
        price: unitPrice,
        shipping: 0.00, // 大货免邮费
        grandTotal: totalPrice
      }
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "请求解析失败" },
      { status: 500 }
    );
  }
}

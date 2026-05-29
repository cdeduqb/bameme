"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface MessageItem {
  id: string;
  email: string;
  company: string;
  quantity: string;
  scenario: string;
  color: string;
  process: string;
  note: string;
  logoName: string;
  logoDataUrl: string | null;
  submittedAt: string;
}

export default function InquiryAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // 筛选状态
  const [searchTerm, setSearchTerm] = useState("");
  const [scenarioFilter, setScenarioFilter] = useState("all");

  // 默认访问口令设置为用户的 QQ 号
  const ADMIN_PASSWORD = "237862623";

  // 1. 挂载时检查本地 Token
  useEffect(() => {
    const token = localStorage.getItem("inquiry_admin_token");
    if (token === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchMessages();
    } else {
      setLoading(false);
    }
  }, []);

  // 2. 获取数据列表
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/inquiry");
      const data = await response.json();
      if (response.ok && data.success) {
        setMessages(data.messages || []);
      } else {
        setError(data.error || "获取留言数据失败");
      }
    } catch (err) {
      console.error(err);
      setError("网络错误，无法连接至后台接口");
    } finally {
      setLoading(false);
    }
  };

  // 3. 处理密码验证提交
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("inquiry_admin_token", password);
      setIsAuthenticated(true);
      setAuthError("");
      fetchMessages();
    } else {
      setAuthError("口令不正确，请重新输入");
    }
  };

  // 4. 清除 Token 退出登录
  const handleLogout = () => {
    localStorage.removeItem("inquiry_admin_token");
    setIsAuthenticated(false);
    setMessages([]);
    setPassword("");
  };

  // 映射函数
  const getScenarioLabel = (key: string) => {
    const map: Record<string, string> = {
      jewelry: "珠宝首饰袋",
      cosmetics: "美妆香水袋",
      gifts: "商务礼品袋",
      tech: "数码配件袋",
      watches: "高档腕表袋",
    };
    return map[key] || key;
  };

  const getColorLabel = (key: string) => {
    const map: Record<string, string> = {
      cream: "奶油白",
      pink: "蔷薇粉",
      sage: "鼠尾草绿",
      charcoal: "炭黑色",
      camel: "驼色",
    };
    return map[key] || key;
  };

  const getProcessLabel = (key: string) => {
    const map: Record<string, string> = {
      gold: "金属烫金",
      silver: "金属烫银",
      debossed: "热压印凹凸",
    };
    return map[key] || key;
  };

  // 5. 过滤与搜索逻辑
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.note.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesScenario = scenarioFilter === "all" || msg.scenario === scenarioFilter;
    
    return matchesSearch && matchesScenario;
  });

  // 6. 统计计算
  const totalCount = messages.length;
  const todayCount = messages.filter((msg) => {
    const date = new Date(msg.submittedAt);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }).length;

  // 认证界面渲染
  if (!isAuthenticated) {
    return (
      <div className="admin-auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="gold-icon">🔐</span>
            <h2>BAMEME 询盘管理后台</h2>
            <p>请在此输入管理员访问口令，以保障买家数据与隐私安全。</p>
          </div>
          <form onSubmit={handleAuthSubmit} className="auth-form">
            <input
              type="password"
              placeholder="请输入管理员访问口令"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {authError && <p className="auth-error-msg">{authError}</p>}
            <button type="submit" className="btn-auth-submit">
              验证并进入面板 ➔
            </button>
          </form>
          <div className="auth-footer">
            <p>默认口令为您的 QQ 账号</p>
          </div>
        </div>

        <style jsx global>{`
          .admin-auth-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #faf9f6 0%, #f2ede4 100%);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            padding: 1.5rem;
          }
          .auth-card {
            background: #ffffff;
            border: 1px solid #ebdcb9;
            padding: 3rem 2.5rem;
            border-radius: 1.5rem;
            width: 100%;
            max-width: 440px;
            box-shadow: 0 20px 40px rgba(43, 38, 31, 0.06);
            text-align: center;
          }
          .auth-header .gold-icon {
            font-size: 2.5rem;
            display: block;
            margin-bottom: 1rem;
          }
          .auth-header h2 {
            font-size: 1.45rem;
            color: #2b261f;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            letter-spacing: -0.01em;
          }
          .auth-header p {
            color: #7a6e60;
            font-size: 0.88rem;
            line-height: 1.5;
            margin: 0 0 2rem 0;
          }
          .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .auth-input {
            width: 100%;
            padding: 0.9rem 1.2rem;
            border: 1px solid #e1d8cc;
            border-radius: 0.75rem;
            font-size: 0.95rem;
            outline: none;
            text-align: center;
            background-color: #faf9f6;
            transition: all 0.2s;
          }
          .auth-input:focus {
            border-color: #b48a50;
            background-color: #ffffff;
            box-shadow: 0 0 0 3px rgba(180, 138, 80, 0.1);
          }
          .auth-error-msg {
            color: #d32f2f;
            font-size: 0.82rem;
            margin: -0.25rem 0 0 0;
            text-align: center;
          }
          .btn-auth-submit {
            padding: 0.95rem;
            background: linear-gradient(135deg, #2b261f 0%, #15120e 100%);
            color: #ffffff;
            border: none;
            border-radius: 0.75rem;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(21, 18, 14, 0.15);
          }
          .btn-auth-submit:hover {
            background: linear-gradient(135deg, #b48a50 0%, #96703c 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(180, 138, 80, 0.25);
          }
          .auth-footer {
            margin-top: 1.5rem;
            font-size: 0.78rem;
            color: #a89f91;
          }
        `}</style>
      </div>
    );
  }

  // 管理后台主界面渲染
  return (
    <div className="admin-dashboard-container">
      {/* 顶部通栏 */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>询盘留言管理后台</h1>
          <p>BAMEME Packaging 官方买家数据面板</p>
        </div>
        <div className="header-right">
          <button onClick={fetchMessages} className="btn-refresh" disabled={loading}>
            {loading ? "更新中..." : "🔄 刷新数据"}
          </button>
          <button onClick={handleLogout} className="btn-logout">
            🚪 退出登录
          </button>
        </div>
      </header>

      {/* 数据概览卡片 */}
      <section className="overview-section">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">总询盘数量</span>
            <span className="stat-value">{totalCount}</span>
          </div>
          <span className="stat-badge">📥 历史累计</span>
        </div>

        <div className="stat-card highlight">
          <div className="stat-info">
            <span className="stat-label">今日新增询盘</span>
            <span className="stat-value">{todayCount}</span>
          </div>
          <span className="stat-badge">✨ 今日活跃</span>
        </div>
      </section>

      {/* 过滤器工具栏 */}
      <section className="filter-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="搜索买家邮箱、公司或留言内容..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="btn-clear-search">
              ✕
            </button>
          )}
        </div>

        <div className="filter-group">
          <label>行业筛选:</label>
          <select value={scenarioFilter} onChange={(e) => setScenarioFilter(e.target.value)}>
            <option value="all">全部行业场景</option>
            <option value="jewelry">珠宝首饰袋</option>
            <option value="cosmetics">美妆香水袋</option>
            <option value="gifts">商务礼品袋</option>
            <option value="tech">数码配件袋</option>
            <option value="watches">高档腕表袋</option>
          </select>
        </div>
      </section>

      {/* 主体留言列表区域 */}
      <main className="dashboard-main-content">
        {loading && messages.length === 0 ? (
          <div className="state-placeholder">
            <span className="spinner"></span>
            <p>正在加载本地备份数据，请稍候...</p>
          </div>
        ) : error ? (
          <div className="state-placeholder error">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button onClick={fetchMessages} className="btn-retry">
              重新加载
            </button>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="state-placeholder empty">
            <span className="empty-icon">📭</span>
            <p>{searchTerm || scenarioFilter !== "all" ? "没有找到符合筛选条件的询盘留言" : "暂无买家提交询盘记录"}</p>
          </div>
        ) : (
          <div className="messages-grid">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className="message-card">
                {/* 卡片头部 */}
                <div className="card-header">
                  <div className="client-meta">
                    <span className="client-email">{msg.email}</span>
                    {msg.company && <span className="client-company">{msg.company}</span>}
                  </div>
                  <span className="submit-time">
                    {new Date(msg.submittedAt).toLocaleString("zh-CN")}
                  </span>
                </div>

                {/* 卡片规格详情区 */}
                <div className="card-specs">
                  <div className="spec-tag">
                    <span className="label">需求数量</span>
                    <span className="value font-bold">{msg.quantity} pcs</span>
                  </div>
                  <div className="spec-tag">
                    <span className="label">行业场景</span>
                    <span className="value">{getScenarioLabel(msg.scenario)}</span>
                  </div>
                  <div className="spec-tag">
                    <span className="label">期望颜色</span>
                    <span className="value">{getColorLabel(msg.color)}</span>
                  </div>
                  <div className="spec-tag">
                    <span className="label">Logo工艺</span>
                    <span className="value">{getProcessLabel(msg.process)}</span>
                  </div>
                </div>

                {/* 留言正文 */}
                <div className="card-note-box">
                  <h4>买家留言备注：</h4>
                  <p>{msg.note || "该买家未填写额外留言备注。"}</p>
                </div>

                {/* 附件 Logo 预览 */}
                {msg.logoDataUrl && (
                  <div className="card-logo-preview">
                    <div className="logo-info">
                      <span>📎 附件 Logo: <strong>{msg.logoName}</strong></span>
                      <a href={msg.logoDataUrl} download={msg.logoName} className="btn-download-logo">
                        📥 下载 Logo
                      </a>
                    </div>
                    <div className="image-wrapper">
                      <img src={msg.logoDataUrl} alt={`Logo for ${msg.company}`} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <style jsx global>{`
        .admin-dashboard-container {
          min-height: 100vh;
          background-color: #faf9f6;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
          padding: 2.5rem;
          color: #2b261f;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid #ebdcb9;
          padding-bottom: 1.5rem;
        }

        .dashboard-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.4rem 0;
          letter-spacing: -0.02em;
        }

        .dashboard-header p {
          color: #7a6e60;
          font-size: 0.9rem;
          margin: 0;
        }

        .header-right {
          display: flex;
          gap: 1rem;
        }

        .btn-refresh {
          padding: 0.65rem 1.25rem;
          background-color: #ffffff;
          border: 1px solid #b48a50;
          color: #b48a50;
          border-radius: 0.5rem;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-refresh:hover {
          background-color: #faf6f0;
          transform: translateY(-1px);
        }

        .btn-logout {
          padding: 0.65rem 1.25rem;
          background-color: #f2ede4;
          border: 1px solid #e1d8cc;
          color: #6b5e4c;
          border-radius: 0.5rem;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background-color: #e1d8cc;
          color: #2b261f;
        }

        /* 统计卡片 */
        .overview-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background-color: #ffffff;
          border: 1px solid #f2ede4;
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 12px rgba(43, 38, 31, 0.02);
        }

        .stat-card.highlight {
          border-color: #ebdcb9;
          background: linear-gradient(to right bottom, #ffffff, #faf6f0);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #7a6e60;
          font-weight: 500;
        }

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          color: #2b261f;
          line-height: 1;
        }

        .stat-badge {
          font-size: 0.85rem;
          background-color: #faf6f0;
          padding: 0.3rem 0.6rem;
          border-radius: 0.5rem;
          color: #b48a50;
          font-weight: 600;
          border: 1px solid #f2ede4;
        }

        /* 过滤器工具栏 */
        .filter-toolbar {
          background-color: #ffffff;
          border: 1px solid #f2ede4;
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: center;
          box-shadow: 0 4px 12px rgba(43, 38, 31, 0.02);
        }

        .search-box {
          display: flex;
          align-items: center;
          border: 1px solid #e1d8cc;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          background-color: #faf9f6;
          width: 100%;
          max-width: 400px;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .search-box:focus-within {
          border-color: #b48a50;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(180, 138, 80, 0.1);
        }

        .search-box input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.9rem;
          color: #2b261f;
          width: 100%;
        }

        .btn-clear-search {
          border: none;
          background: transparent;
          color: #a89f91;
          cursor: pointer;
          font-size: 0.8rem;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
        }

        .filter-group label {
          color: #7a6e60;
          font-weight: 600;
        }

        .filter-group select {
          padding: 0.5rem 1rem;
          border: 1px solid #e1d8cc;
          border-radius: 0.5rem;
          outline: none;
          background-color: #ffffff;
          color: #2b261f;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .filter-group select:focus {
          border-color: #b48a50;
        }

        /* 留言列表 */
        .messages-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .message-card {
          background-color: #ffffff;
          border: 1px solid #f2ede4;
          border-left: 4px solid #b48a50;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(43, 38, 31, 0.02);
          transition: all 0.25s;
        }

        .message-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(43, 38, 31, 0.04);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #faf6f0;
          padding-bottom: 1rem;
        }

        .client-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .client-email {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2b261f;
        }

        .client-company {
          font-size: 0.88rem;
          color: #7a6e60;
          background-color: #faf6f0;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          width: fit-content;
          border: 1px solid #ebdcb9;
          font-weight: 500;
        }

        .submit-time {
          font-size: 0.82rem;
          color: #a89f91;
        }

        .card-specs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
          background-color: #faf9f6;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          border: 1px dashed #e1d8cc;
        }

        .spec-tag {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .spec-tag .label {
          font-size: 0.75rem;
          color: #a89f91;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .spec-tag .value {
          font-size: 0.9rem;
          color: #2b261f;
          font-weight: 600;
        }

        .spec-tag .value.font-bold {
          color: #b48a50;
          font-size: 0.98rem;
        }

        .card-note-box {
          margin-bottom: 1.5rem;
        }

        .card-note-box h4 {
          font-size: 0.88rem;
          color: #7a6e60;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .card-note-box p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          white-space: pre-wrap;
          color: #4a4238;
        }

        /* Logo 预览区 */
        .card-logo-preview {
          border-top: 1px solid #faf6f0;
          padding-top: 1.25rem;
        }

        .logo-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          color: #7a6e60;
        }

        .btn-download-logo {
          color: #b48a50;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .btn-download-logo:hover {
          color: #96703c;
          text-decoration: underline;
        }

        .card-logo-preview .image-wrapper {
          background-color: #faf9f6;
          border: 1px solid #ebdcb9;
          border-radius: 0.75rem;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 320px;
        }

        .card-logo-preview img {
          max-width: 100%;
          max-height: 150px;
          object-fit: contain;
          border-radius: 4px;
        }

        /* 状态占位符 */
        .state-placeholder {
          text-align: center;
          padding: 6rem 2rem;
          background-color: #ffffff;
          border: 1px solid #f2ede4;
          border-radius: 1.5rem;
          box-shadow: 0 4px 12px rgba(43, 38, 31, 0.02);
        }

        .state-placeholder p {
          color: #7a6e60;
          font-size: 0.95rem;
          margin: 1rem 0 0 0;
        }

        .spinner {
          display: inline-block;
          width: 32px;
          height: 32px;
          border: 3px solid rgba(180, 138, 80, 0.1);
          border-radius: 50%;
          border-top-color: #b48a50;
          animation: spin 0.8s linear infinite;
        }

        .error-icon, .empty-icon {
          font-size: 3rem;
          display: block;
        }

        .btn-retry {
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background-color: #2b261f;
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .admin-dashboard-container {
            padding: 1.5rem;
          }
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .header-right {
            width: 100%;
          }
          .header-right button {
            flex: 1;
            text-align: center;
          }
          .filter-toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            max-width: 100%;
          }
          .filter-group {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}

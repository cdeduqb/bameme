"use client";

import React, { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// 预设袋子颜色
export const POUCH_COLORS = [
  { id: "cream", nameKey: "colorCream", value: "#f5f2eb", textColor: "#6b5e4c" },
  { id: "pink", nameKey: "colorPink", value: "#ebd2cc", textColor: "#8a665d" },
  { id: "sage", nameKey: "colorSage", value: "#d0d6c8", textColor: "#4b5245" },
  { id: "charcoal", nameKey: "colorCharcoal", value: "#4e4f50", textColor: "#f5f2eb" },
  { id: "camel", nameKey: "colorCamel", value: "#c4a482", textColor: "#fffbf5" },
];

// 预设印刷工艺
export const PROCESS_TYPES = [
  { 
    id: "gold", 
    nameKey: "processGold", 
    gradient: "linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
    shadow: "0 1px 2px rgba(0,0,0,0.15)"
  },
  { 
    id: "silver", 
    nameKey: "processSilver", 
    gradient: "linear-gradient(135deg, #d3d3d3 0%, #f5f5f5 25%, #a9a9a9 50%, #f5f5f5 75%, #808080 100%)",
    shadow: "0 1px 2px rgba(0,0,0,0.15)"
  },
  { 
    id: "debossed", 
    nameKey: "processDebossed", 
    gradient: "rgba(0, 0, 0, 0.4)",
    shadow: "inset 1px 1px 2px rgba(0,0,0,0.6), 1px 1px 1px rgba(255,255,255,0.4)"
  }
];

interface CustomizerProps {
  selectedColor: typeof POUCH_COLORS[0];
  setSelectedColor: (color: typeof POUCH_COLORS[0]) => void;
  selectedProcess: typeof PROCESS_TYPES[0];
  setSelectedProcess: (process: typeof PROCESS_TYPES[0]) => void;
  logoSrc: string | null;
  setLogoSrc: (src: string | null) => void;
  logoSize: number;
  setLogoSize: (size: number) => void;
  logoY: number;
  setLogoY: (y: number) => void;
}

export default function Customizer({
  selectedColor,
  setSelectedColor,
  selectedProcess,
  setSelectedProcess,
  logoSrc,
  setLogoSrc,
  logoSize,
  setLogoSize,
  logoY,
  setLogoY
}: CustomizerProps) {
  const t = useTranslations("Index");
  const [selectedScenario, setSelectedScenario] = useState<"jewelry" | "cosmetics" | "gifts" | "tech" | "watches">("jewelry");
  const [isDragging, setIsDragging] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 场景联动逻辑，切换时自动推荐配色及印刷工艺
  const handleScenarioChange = (scenarioId: "jewelry" | "cosmetics" | "gifts" | "tech" | "watches") => {
    setSelectedScenario(scenarioId);
    
    if (scenarioId === "tech") {
      const charcoalColor = POUCH_COLORS.find(c => c.id === "charcoal");
      const debossedProcess = PROCESS_TYPES.find(p => p.id === "debossed");
      if (charcoalColor) setSelectedColor(charcoalColor);
      if (debossedProcess) setSelectedProcess(debossedProcess);
    } else if (scenarioId === "jewelry") {
      const sageColor = POUCH_COLORS.find(c => c.id === "sage");
      const goldProcess = PROCESS_TYPES.find(p => p.id === "gold");
      if (sageColor) setSelectedColor(sageColor);
      if (goldProcess) setSelectedProcess(goldProcess);
    } else if (scenarioId === "cosmetics") {
      const pinkColor = POUCH_COLORS.find(c => c.id === "pink");
      const goldProcess = PROCESS_TYPES.find(p => p.id === "gold");
      if (pinkColor) setSelectedColor(pinkColor);
      if (goldProcess) setSelectedProcess(goldProcess);
    } else if (scenarioId === "watches") {
      const camelColor = POUCH_COLORS.find(c => c.id === "camel");
      const debossedProcess = PROCESS_TYPES.find(p => p.id === "debossed");
      if (camelColor) setSelectedColor(camelColor);
      if (debossedProcess) setSelectedProcess(debossedProcess);
    } else if (scenarioId === "gifts") {
      const creamColor = POUCH_COLORS.find(c => c.id === "cream");
      const goldProcess = PROCESS_TYPES.find(p => p.id === "gold");
      if (creamColor) setSelectedColor(creamColor);
      if (goldProcess) setSelectedProcess(goldProcess);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 默认占位 LOGO - 一个优雅的首饰品牌圆形图案 (SVG DataURL)
  const defaultLogo = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="50" cy="50" r="35" stroke-dasharray="2 2" />
      <circle cx="50" cy="50" r="28" />
      <path d="M50 32 L50 68 M32 50 L68 50" stroke-width="1" opacity="0.3" />
      <text x="50" y="54" font-family="'Playfair Display', serif" font-size="10" text-anchor="middle" fill="currentColor" letter-spacing="1">B A M E M E</text>
      <text x="50" y="80" font-family="sans-serif" font-size="5" text-anchor="middle" fill="currentColor" letter-spacing="2" opacity="0.5">JEWELRY</text>
    </svg>
  `)}`;

  const currentLogo = logoSrc || defaultLogo;

  // 上传图片处理：自动过滤纯白色底图转换为透明PNG
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsRemovingBg(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setLogoSrc(event.target?.result as string);
          setIsRemovingBg(false);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // 遍历像素，将白底或接近白色的背景设为透明
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // 如果 R, G, B 均大于 240 (接近白色)，将其 Alpha 透明度设为 0
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setLogoSrc(canvas.toDataURL("image/png"));
        setIsRemovingBg(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // 鼠标拖拽控制 LOGO 的上下位置 (限制在安全印刷区域内)
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let relativeY = ((e.clientY - rect.top) / rect.height) * 100;
      if (relativeY < 25) relativeY = 25;
      if (relativeY > 75) relativeY = 75;
      setLogoY(relativeY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, setLogoY]);

  // 触摸屏拖拽适配
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    let relativeY = ((touch.clientY - rect.top) / rect.height) * 100;
    if (relativeY < 25) relativeY = 25;
    if (relativeY > 75) relativeY = 75;
    setLogoY(relativeY);
  };

  return (
    <div className="customizer-container">
      {/* 预览区 */}
      <div className="preview-panel">
        {/* 动态场景辅助摆件背景层 - 用于突显多场景适配度 */}
        <div className={`scenario-accessory-layer scenario-${selectedScenario}`}>
          {selectedScenario === "jewelry" && (
            <svg viewBox="0 0 100 100" fill="none" className="accessory-svg fade-in-item">
              <circle cx="32" cy="72" r="10" stroke="#b48a50" strokeWidth="2" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.1))" />
              <circle cx="32" cy="58" r="3" fill="#e74c3c" />
              <path d="M72 15 C67 35, 47 60, 54 75" stroke="#b48a50" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 1.5" />
              <circle cx="54" cy="75" r="5" fill="#3498db" />
              <circle cx="54" cy="75" r="2.5" fill="#fff" opacity="0.7" />
            </svg>
          )}
          {selectedScenario === "cosmetics" && (
            <svg viewBox="0 0 100 100" fill="none" className="accessory-svg fade-in-item">
              <rect x="25" y="50" width="12" height="30" rx="1.5" fill="#151515" />
              <rect x="25" y="58" width="12" height="2" fill="#b48a50" />
              <rect x="27" y="36" width="8" height="14" fill="#b48a50" />
              <path d="M27 36 L35 32 L35 45 L27 45 Z" fill="#e84393" />
              
              <rect x="58" y="42" width="24" height="36" rx="4" fill="rgba(255,255,255,0.8)" stroke="#b48a50" strokeWidth="1" />
              <rect x="66" y="35" width="8" height="7" fill="#b48a50" />
              <circle cx="70" cy="31" r="4" fill="#b48a50" />
              <rect x="63" y="50" width="14" height="18" fill="#fff" stroke="#eee" strokeWidth="0.5" />
              <text x="70" y="60" fontSize="4.5" fontFamily="Playfair Display" textAnchor="middle" fill="#2b261f" fontWeight="bold">BAMEME</text>
            </svg>
          )}
          {selectedScenario === "gifts" && (
            <svg viewBox="0 0 100 100" fill="none" className="accessory-svg fade-in-item">
              <path d="M30 65 Q 20 50, 45 40 T 60 70" stroke="#7a6e60" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
              <circle cx="45" cy="40" r="3" fill="#e17055" opacity="0.8" />
              <circle cx="50" cy="36" r="2.5" fill="#ffeaa7" opacity="0.8" />
              <circle cx="38" cy="42" r="3.5" fill="#fab1a0" opacity="0.8" />
              
              <path d="M65 72 C 55 72, 50 60, 52 50 C 54 40, 70 45, 70 58 C 70 70, 65 72, 65 72 Z" fill="none" stroke="#b48a50" strokeWidth="1.5" />
              <path d="M65 72 C 75 72, 80 60, 78 50 C 76 40, 60 45, 60 58 C 60 70, 65 72, 65 72 Z" fill="none" stroke="#b48a50" strokeWidth="1.5" />
            </svg>
          )}
          {selectedScenario === "tech" && (
            <svg viewBox="0 0 100 100" fill="none" className="accessory-svg fade-in-item">
              <rect x="35" y="45" width="28" height="34" rx="8" fill="#ffffff" stroke="#e6e6e6" strokeWidth="1.2" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.06))" />
              <rect x="41" y="45" width="16" height="0.8" fill="#d0d0d0" />
              <circle cx="49" cy="62" r="1.5" fill="#2ecc71" />
              
              <rect x="18" y="55" width="5" height="18" rx="2.5" fill="#ffffff" stroke="#e6e6e6" strokeWidth="0.8" />
              <circle cx="18" cy="52" r="6" fill="#ffffff" stroke="#e6e6e6" strokeWidth="0.8" />
              <circle cx="18" cy="52" r="3.5" fill="#efefef" />
            </svg>
          )}
          {selectedScenario === "watches" && (
            <svg viewBox="0 0 100 100" fill="none" className="accessory-svg fade-in-item">
              <rect x="44" y="15" width="12" height="70" rx="2" fill="#4a2e1b" stroke="#362214" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="18" fill="#fcfcfc" stroke="#999" strokeWidth="2.5" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.12))" />
              <circle cx="50" cy="50" r="15" fill="#1c1c1c" />
              <circle cx="50" cy="50" r="1" fill="#fff" />
              <path d="M50 50 L50 40" stroke="#b48a50" strokeWidth="1" strokeLinecap="round" />
              <path d="M50 50 L58 53" stroke="#b48a50" strokeWidth="0.8" strokeLinecap="round" />
              <circle cx="50" cy="38" r="0.6" fill="#fff" />
              <circle cx="62" cy="50" r="0.6" fill="#fff" />
              <circle cx="50" cy="62" r="0.6" fill="#fff" />
              <circle cx="38" cy="50" r="0.6" fill="#fff" />
            </svg>
          )}
        </div>

        <div 
          ref={containerRef} 
          className="pouch-preview-wrapper"
          style={{ backgroundColor: selectedColor.value }}
        >
          {/* 超细纤维缝线与质感叠加层 */}
          <div className="pouch-texture-overlay"></div>
          
          {/* 缝合线 */}
          <div className="pouch-stitch-line stitch-top"></div>
          <div className="pouch-stitch-line stitch-bottom"></div>
          <div className="pouch-stitch-line stitch-left"></div>
          <div className="pouch-stitch-line stitch-right"></div>
          
          {/* 信封翻盖阴影与金属纽扣 */}
          <div className="pouch-flap-shadow"></div>
          <div className="pouch-button-snap"></div>

          {/* 可拖拽 LOGO 贴图区 */}
          <div 
            className="logo-draggable-zone"
            style={{ 
              top: `${logoY}%`,
              width: `${logoSize}%`,
              height: `${logoSize}%`,
            }}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
          >
            {/* 使用 CSS mask-image 渲染烫金和烫银 */}
            {selectedProcess.id !== "debossed" ? (
              <div 
                className="logo-foil-render"
                style={{
                  WebkitMaskImage: `url(${currentLogo})`,
                  maskImage: `url(${currentLogo})`,
                  background: selectedProcess.gradient,
                  boxShadow: selectedProcess.shadow,
                }}
              />
            ) : (
              // 凹凸热压效果 (使用多重阴影和内发光)
              <div 
                className="logo-debossed-render"
                style={{
                  WebkitMaskImage: `url(${currentLogo})`,
                  maskImage: `url(${currentLogo})`,
                  backgroundColor: selectedColor.textColor,
                  opacity: 0.65,
                  mixBlendMode: "multiply",
                  filter: "drop-shadow(0.5px 0.5px 0.5px rgba(255,255,255,0.7)) drop-shadow(-0.5px -0.5px 0.5px rgba(0,0,0,0.8))"
                }}
              />
            )}
            
            {/* 辅助拖拽框 */}
            <div className="drag-indicator">
              <span>↕ {t("dragToMove")} ↕</span>
            </div>
          </div>

          <div className="preview-hint">
            <span>{t("safePrintArea")}</span>
          </div>
        </div>
      </div>

      {/* 控制面板 */}
      <div className="control-panel">
        <h3 className="panel-title">{t("customizerPanelTitle")}</h3>

        {/* 核心升级：使用场景选择（联动工艺与配色，突出多维流量入口） */}
        <div className="control-group">
          <label className="group-label">{t("useCasesTitle")}</label>
          <div className="scenario-selector-grid">
            {(
              [
                { id: "jewelry", nameKey: "useCaseJewelry", icon: "💍" },
                { id: "cosmetics", nameKey: "useCaseCosmetics", icon: "💄" },
                { id: "gifts", nameKey: "useCaseGifts", icon: "🎁" },
                { id: "tech", nameKey: "useCaseTech", icon: "🎧" },
                { id: "watches", nameKey: "useCaseWatches", icon: "⌚" },
              ] as const
            ).map((scen) => (
              <button
                key={scen.id}
                className={`scenario-btn ${selectedScenario === scen.id ? "active" : ""}`}
                onClick={() => handleScenarioChange(scen.id)}
              >
                <span className="scen-icon">{scen.icon}</span>
                <span className="scen-name">{t(scen.nameKey)}</span>
              </button>
            ))}
          </div>
          
          {/* 智能推荐工艺与尺寸提示盒 */}
          <div className="recommendation-tip-box">
            <span className="recommendation-badge">{t("tipsTitle")}</span>
            <p className="recommendation-text">
              {selectedScenario === "jewelry" && t("tipJewelry")}
              {selectedScenario === "cosmetics" && t("tipCosmetics")}
              {selectedScenario === "gifts" && t("tipGifts")}
              {selectedScenario === "tech" && t("tipTech")}
              {selectedScenario === "watches" && t("tipWatches")}
            </p>
          </div>
        </div>
        
        {/* 上传 LOGO */}
        <div className="control-group">
          <label className="group-label">{t("uploadLogoLabel")}</label>
          <div className="upload-btn-wrapper">
            <button 
              className="btn-upload" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isRemovingBg}
            >
              {isRemovingBg ? t("filteringBg") : logoSrc ? t("reuploadLogo") : t("selectLogoImage")}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleLogoUpload} 
              accept="image/*" 
              style={{ display: "none" }}
            />
            {logoSrc && (
              <button className="btn-clear-logo" onClick={() => setLogoSrc(null)}>
                {t("resetToDefault")}
              </button>
            )}
          </div>
          <p className="upload-tip">{t("uploadLogoTip")}</p>
        </div>

        {/* 材质颜色 */}
        <div className="control-group">
          <label className="group-label">{t("selectBagColor")}</label>
          <div className="color-picker-grid">
            {POUCH_COLORS.map((color) => (
              <button
                key={color.id}
                className={`color-dot-btn ${selectedColor.id === color.id ? "active" : ""}`}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color.value }}
                title={t(color.nameKey)}
              />
            ))}
          </div>
          <span className="selected-value-text">{t(selectedColor.nameKey)} ({t("microfiberFabric")})</span>
        </div>

        {/* 印刷工艺 */}
        <div className="control-group">
          <label className="group-label">{t("selectProcess")}</label>
          <div className="process-selector-list">
            {PROCESS_TYPES.map((proc) => (
              <button
                key={proc.id}
                className={`process-option ${selectedProcess.id === proc.id ? "active" : ""}`}
                onClick={() => setSelectedProcess(proc)}
              >
                {t(proc.nameKey)}
              </button>
            ))}
          </div>
        </div>

        {/* 尺寸微调 */}
        <div className="control-group">
          <div className="label-with-value">
            <label className="group-label">{t("adjustLogoSize")}</label>
            <span className="value-display">{logoSize}%</span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="60" 
            value={logoSize} 
            onChange={(e) => setLogoSize(Number(e.target.value))}
            className="slider-input"
          />
        </div>
      </div>

      <style jsx global>{`
        /* 饰品定位与淡入动效 */
        .scenario-accessory-layer {
          position: absolute;
          bottom: 4%;
          right: 4%;
          width: 48%;
          height: 48%;
          z-index: 6;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .accessory-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 8px 20px rgba(43, 38, 31, 0.18));
        }

        .fade-in-item {
          animation: floatInScenario 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes floatInScenario {
          from {
            opacity: 0;
            transform: translateY(20px) rotate(5deg) scale(0.85);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        /* 场景选择器样式 */
        .scenario-selector-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.4rem;
          margin-bottom: 0.25rem;
        }

        @media (max-width: 480px) {
          .scenario-selector-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .scenario-btn {
          background: #faf8f5;
          color: #7a6e60;
          border: 1px solid #f2ede4;
          border-radius: 0.5rem;
          padding: 0.5rem 0.25rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .scenario-btn:hover {
          background: #f4efeb;
          border-color: #e5dec9;
          color: #2b261f;
        }

        .scenario-btn.active {
          background: #faf2e6;
          border-color: #b48a50;
          color: #a07840;
          box-shadow: 0 4px 10px rgba(180, 138, 80, 0.08);
          font-weight: 600;
        }

        .scen-icon {
          font-size: 1.15rem;
        }

        .scen-name {
          font-size: 0.7rem;
          white-space: nowrap;
        }

        /* 推荐提示盒样式 */
        .recommendation-tip-box {
          background: #fdfbf7;
          border-left: 3px solid #b48a50;
          padding: 0.75rem 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
          margin-top: 0.25rem;
          box-shadow: inset 0 0 10px rgba(180, 138, 80, 0.02);
        }

        .recommendation-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #b48a50;
          display: inline-block;
          margin-bottom: 0.25rem;
        }

        .recommendation-text {
          font-size: 0.75rem;
          color: #5c5346;
          line-height: 1.4;
          margin: 0;
        }

        .customizer-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
          background: #ffffff;
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          border: 1px solid #f0eae1;
          position: relative;
        }

        @media (max-width: 968px) {
          .customizer-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1rem;
          }
        }

        .preview-panel {
          width: 100%;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf8f5;
          border-radius: 1rem;
          border: 1px solid #f2ede4;
          overflow: hidden;
          position: relative;
        }

        .pouch-preview-wrapper {
          position: relative;
          width: 75%;
          height: 75%;
          border-radius: 1rem;
          box-shadow: 0 15px 45px rgba(0,0,0,0.08);
          transition: background-color 0.3s ease;
          overflow: hidden;
          cursor: pointer;
        }

        .pouch-texture-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          pointer-events: none;
          background-image: 
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 1px),
            radial-gradient(circle at 0 0, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 4px 4px;
        }

        .pouch-stitch-line {
          position: absolute;
          border-style: dashed;
          border-color: rgba(0,0,0,0.08);
          pointer-events: none;
        }
        .stitch-top { top: 12px; left: 12px; right: 12px; border-width: 1px 0 0 0; }
        .stitch-bottom { bottom: 12px; left: 12px; right: 12px; border-width: 1px 0 0 0; }
        .stitch-left { top: 12px; bottom: 12px; left: 12px; border-width: 0 0 0 1px; }
        .stitch-right { top: 12px; bottom: 12px; right: 12px; border-width: 0 0 0 1px; }

        .pouch-flap-shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 35%;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          pointer-events: none;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1rem 1rem 0 0;
        }

        .pouch-button-snap {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37, #aa7c11);
          box-shadow: 0 2px 4px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.4);
          z-index: 2;
        }

        .logo-draggable-zone {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          z-index: 10;
          transition: width 0.2s ease, height 0.2s ease;
        }

        .logo-draggable-zone:active {
          cursor: grabbing;
        }

        .logo-foil-render,
        .logo-debossed-render {
          width: 100%;
          height: 100%;
          mask-size: contain;
          WebkitMaskSize: contain;
          mask-repeat: no-repeat;
          WebkitMaskRepeat: no-repeat;
          mask-position: center;
          WebkitMaskPosition: center;
          transition: background 0.3s ease;
        }

        .drag-indicator {
          position: absolute;
          inset: -8px;
          border: 1px dashed rgba(180, 150, 100, 0.4);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          background: rgba(250, 245, 235, 0.6);
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .logo-draggable-zone:hover .drag-indicator {
          opacity: 1;
        }

        .drag-indicator span {
          font-size: 9px;
          color: #a07840;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .preview-hint {
          position: absolute;
          bottom: 16px;
          left: 0;
          right: 0;
          text-align: center;
          pointer-events: none;
        }

        .preview-hint span {
          font-size: 10px;
          color: rgba(0,0,0,0.25);
          letter-spacing: 0.5px;
        }

        .control-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .panel-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #2b261f;
          margin-bottom: 0.5rem;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .group-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #5c5346;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .label-with-value {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .value-display {
          font-size: 0.85rem;
          font-weight: 600;
          color: #b48a50;
        }

        .upload-btn-wrapper {
          display: flex;
          gap: 0.5rem;
        }

        .btn-upload {
          flex: 1;
          background: #2b261f;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-upload:hover {
          background: #463e33;
        }

        .btn-upload:disabled {
          background: #8e877e;
          cursor: not-allowed;
        }

        .btn-clear-logo {
          background: #faf8f5;
          color: #c0392b;
          border: 1px solid #f2ede4;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-clear-logo:hover {
          background: #fdf2f2;
          border-color: #f5c2c2;
        }

        .upload-tip {
          font-size: 0.75rem;
          color: #8e877e;
          line-height: 1.4;
        }

        .color-picker-grid {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }

        .color-dot-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04);
        }

        .color-dot-btn.active {
          border-color: #b48a50;
          transform: scale(1.15);
        }

        .selected-value-text {
          font-size: 0.8rem;
          color: #8e877e;
          margin-top: 0.2rem;
        }

        .process-selector-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .process-option {
          background: #faf8f5;
          color: #5c5346;
          border: 1px solid #f2ede4;
          padding: 0.75rem 0.5rem;
          font-size: 0.8rem;
          font-weight: 500;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .process-option:hover {
          background: #f4efeb;
        }

        .process-option.active {
          background: #faf2e6;
          color: #a07840;
          border-color: #b48a50;
          font-weight: 600;
        }

        .slider-input {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: #f2ede4;
          outline: none;
          margin: 0.5rem 0;
        }

        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #b48a50;
          cursor: pointer;
          transition: transform 0.1s;
        }

        .slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}

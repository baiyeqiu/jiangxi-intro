import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mountain,
  MapPin,
  X,
  Star,
  Camera,
  Trees,
  Waves,
  Landmark,
  Sparkles,
} from "lucide-react";
import sceneryData from "@/data/scenery.json";

/* ────────── 类型定义 ────────── */
interface SceneryItem {
  id: string;
  name: string;
  location: string;
  description: string;
  detailDescription: string;
  image: string;
  tags: string[];
  highlights: string[];
}

/* ────────── 动画变体 ────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

/* ────────── 页头区域 (Page Header) ────────── */
function PageHeader() {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Majestic%20Jiangxi%20mountain%20landscape%20with%20misty%20peaks%2C%20winding%20river%20through%20valley%2C%20traditional%20Chinese%20ink%20painting%20style%2C%20ethereal%20clouds%20and%20green%20forests%2C%20serene%20atmosphere&image_size=landscape_16_9')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-jiangxi-green-dark/80 via-jiangxi-green/60 to-jiangxi-green-dark/70" />
      </div>

      {/* 装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-40 h-40 rounded-full bg-white/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[20%] right-[12%] w-52 h-52 rounded-full bg-jiangxi-gold/8 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-[45%] right-[25%] w-28 h-28 rounded-full bg-white/4 blur-2xl"
        />

        {/* 山水装饰线条 */}
        <svg
          className="absolute bottom-0 left-0 w-full text-white/[0.04]"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,122.7C672,139,768,149,864,138.7C960,128,1056,96,1152,85.3C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* 内容 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* 图标徽章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-8"
          >
            <Mountain size={16} className="text-jiangxi-gold" />
            <span>探索江西 · 自然奇观</span>
          </motion.div>

          {/* 主标题 */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            风光览胜
          </h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
          >
            庐山云海、三清奇峰、龙虎丹霞……
            <br className="hidden sm:block" />
            江西山水，每一处都是大自然的鬼斧神工
          </motion.p>

          {/* 统计信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-6 mt-8 text-white/60 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <Camera size={14} className="text-jiangxi-gold" />
              {sceneryData.length} 处精选景点
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-jiangxi-gold" />
              3 处世界遗产
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────── 景点卡片 ────────── */
function SceneryCard({
  item,
  index,
  onClick,
}: {
  item: SceneryItem;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.08 }}
    >
      <button
        onClick={onClick}
        className="group relative w-full rounded-2xl overflow-hidden bg-white card-hover text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-jiangxi-green focus-visible:ring-offset-2"
      >
        {/* 图片区域 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* 图片遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* 位置标签 */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-jiangxi-green-dark shadow-sm">
            <MapPin size={12} className="text-jiangxi-red" />
            {item.location}
          </div>

          {/* 标签角标 */}
          {item.tags[0] && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-jiangxi-gold/90 text-white text-xs font-medium shadow-sm">
              {item.tags[0]}
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <div className="p-5">
          <h3 className="font-display text-xl font-bold text-jiangxi-green-dark mb-1.5 group-hover:text-jiangxi-green transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-jiangxi-ink-light line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* 高亮点预览 */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
            {item.highlights.slice(0, 2).map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-jiangxi-green/5 text-jiangxi-green text-xs font-medium"
              >
                <Star size={10} className="text-jiangxi-gold" />
                {highlight}
              </span>
            ))}
            {item.highlights.length > 2 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-50 text-jiangxi-ink-light text-xs">
                +{item.highlights.length - 2}
              </span>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}

/* ────────── 详情弹窗 ────────── */
function DetailModal({
  item,
  onClose,
}: {
  item: SceneryItem;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* 遮罩层 */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* 弹窗内容 */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="关闭详情"
          >
            <X size={20} />
          </button>

          {/* 大图区域 */}
          <div className="relative aspect-video overflow-hidden rounded-t-3xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* 图片底部信息 */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-jiangxi-gold" />
                <span className="text-white/90 text-sm font-medium">{item.location}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                {item.name}
              </h2>
            </div>
          </div>

          {/* 详细内容区 */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Tags 标签 */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-jiangxi-green/10 text-jiangxi-green text-sm font-medium"
                >
                  <Sparkles size={13} className="text-jiangxi-gold" />
                  {tag}
                </span>
              ))}
            </div>

            {/* 详细描述 */}
            <div>
              <h3 className="font-display text-lg font-bold text-jiangxi-green-dark mb-3 flex items-center gap-2">
                <Landmark size={18} className="text-jiangxi-red" />
                景点介绍
              </h3>
              <p className="text-jiangxi-ink leading-relaxed text-base">
                {item.detailDescription}
              </p>
            </div>

            {/* Highlights 列表 */}
            <div>
              <h3 className="font-display text-lg font-bold text-jiangxi-green-dark mb-3 flex items-center gap-2">
                <Star size={18} className="text-jiangxi-gold" />
                精彩看点
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-jiangxi-cream/60 border border-jiangxi-green/5"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-jiangxi-green/10 flex items-center justify-center">
                      <Trees size={14} className="text-jiangxi-green" />
                    </span>
                    <span className="text-sm text-jiangxi-ink font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 底部装饰线 */}
            <div className="pt-4 border-t border-gray-100">
              <div className="ink-divider !my-0" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ════════════ 风光览胜页面 ════════════ */
export default function Scenery() {
  const [selectedScenery, setSelectedScenery] = useState<SceneryItem | null>(null);

  const gridRef = useRef(null);
  const isGridView = useInView(gridRef, { once: true, margin: "-80px" });

  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <>
      <PageHeader />

      {/* 景点网格展示区 */}
      <section ref={gridRef} className="section-container bg-ink-wash">
        <div className="container mx-auto">
          {/* 区域标题 */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 25 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">名山大川</h2>
            <p className="section-subtitle">
              从匡庐奇秀到三清仙峰，从丹霞绝壁到鄱阳碧波，每一处风景都值得驻足凝望
            </p>
            <div className="ink-divider" />
          </motion.div>

          {/* 响应式网格 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isGridView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7"
          >
            {sceneryData.map((item, index) => (
              <SceneryCard
                key={item.id}
                item={item as SceneryItem}
                index={index}
                onClick={() => setSelectedScenery(item as SceneryItem)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 底部装饰区域 */}
      <section className="py-16 bg-gradient-to-b from-jiangxi-cream to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Waves size={24} className="text-jiangxi-green" />
              <span className="font-display text-xl font-bold text-jiangxi-green-dark">
                山水赣鄱
              </span>
              <Mountain size={24} className="text-jiangxi-green" />
            </div>
            <p className="text-jiangxi-ink-light text-base leading-relaxed">
              江西之美，在于山之雄伟、水之灵动、文之深厚。
              <br />
              每一处风景，都是大自然与人文历史的完美交融。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedScenery && (
          <DetailModal
            item={selectedScenery}
            onClose={() => setSelectedScenery(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

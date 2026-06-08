import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Package,
  MapPin,
  Tag,
  Sparkles,
  ShoppingBag,
  ChevronRight,
  Filter,
} from "lucide-react";
import specialtiesData from "@/data/specialties.json";

/* ────────── 类型定义 ────────── */
interface Specialty {
  id: string;
  name: string;
  origin: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

/* ────────── 页头区域 ────────── */
function PageHeader() {
  return (
    <section className="relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Jiangxi%20specialty%20products%20market%20scene%2C%20warm%20abundant%20display%20of%20tea%20ceramics%20fruits%20and%20crafts%2C%20rich%20golden%20and%20green%20tones%2C%20traditional%20Chinese%20marketplace%20atmosphere%2C%20cozy%20and%20inviting&image_size=landscape_16_9')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-jiangxi-green-dark/80 via-jiangxi-green-dark/60 to-jiangxi-green-dark/85" />
      </div>

      {/* 装饰光晕 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-jiangxi-gold/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-amber-400/15 blur-3xl"
        />
      </div>

      {/* 内容 */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 徽章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-7"
          >
            <ShoppingBag size={14} className="text-jiangxi-gold" />
            <span>江西好物 · 匠心之选</span>
          </motion.div>

          {/* 主标题 */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-5 leading-tight tracking-tight">
            地方特产
          </h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed font-light"
          >
            从千年瓷都的青花雅韵，到庐山云雾的茶香四溢
            <br className="hidden sm:block" />
            每一份特产，都承载着赣鄱大地的风土与匠心
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────── 分类筛选栏 ────────── */
function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <Filter size={16} className="text-jiangxi-ink-light hidden sm:block" />

        {/* 全部标签 */}
        <button
          onClick={() => onCategoryChange("全部")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
            activeCategory === "全部"
              ? "bg-jiangxi-green text-white shadow-md shadow-jiangxi-green/25"
              : "bg-white text-jiangxi-ink-light hover:bg-jiangxi-green/5 border border-gray-200 hover:border-jiangxi-green/30"
          }`}
        >
          全部
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? "bg-jiangxi-green text-white shadow-md shadow-jiangxi-green/25"
                : "bg-white text-jiangxi-ink-light hover:bg-jiangxi-green/5 border border-gray-200 hover:border-jiangxi-green/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

/* ────────── 产品卡片 ────────── */
function ProductCard({
  specialty,
  index,
}: {
  specialty: Specialty;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group bg-white rounded-2xl overflow-hidden card-hover shadow-sm hover:shadow-xl border border-gray-100/50"
    >
      {/* 图片区域 */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={specialty.image}
          alt={specialty.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* 图片遮罩渐变 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 内容区域 */}
      <div className="p-5">
        {/* 产品名称 */}
        <h3 className="font-display text-lg font-bold text-jiangxi-green-dark mb-2.5 group-hover:text-jiangxi-green transition-colors">
          {specialty.name}
        </h3>

        {/* 产地徽章 */}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={13} className="text-jiangxi-green" />
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-jiangxi-green/10 text-jiangxi-green text-xs font-medium">
            {specialty.origin}
          </span>
        </div>

        {/* 特点标签 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {specialty.features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-jiangxi-gold/8 text-jiangxi-ink-light text-xs"
            >
              <Sparkles size={10} className="text-jiangxi-gold/70" />
              {feature}
            </span>
          ))}
        </div>

        {/* 描述文字 */}
        <p className="text-sm text-jiangxi-ink-light/80 leading-relaxed line-clamp-2">
          {specialty.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ────────── 产品展示墙 ────────── */
function ProductGrid({
  filteredData,
}: {
  filteredData: Specialty[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-container bg-ink-wash">
      <div className="container mx-auto max-w-7xl">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title flex items-center justify-center gap-3">
            <Package size={28} className="text-jiangxi-gold" />
            精选好物
          </h2>
          <p className="section-subtitle">
            汇聚赣鄱大地最具代表性的地方特产，每一件都是时光与匠心的结晶
          </p>
          <div className="ink-divider" />
        </motion.div>

        {/* 产品网格 */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
            {filteredData.map((item, index) => (
              <ProductCard key={item.id} specialty={item} index={index} />
            ))}
          </div>
        </AnimatePresence>

        {/* 无结果提示 */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Tag size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-jiangxi-ink-light text-lg">暂无该分类下的特产</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ────────── 底部推荐语 ────────── */
function BottomCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-jiangxi-green via-jiangxi-green-dark to-jiangxi-green-light" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5"
        />
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full border border-white/5"
        />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* 装饰图标 */}
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-7">
            <ShoppingBag size={28} className="text-jiangxi-gold" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            把江西的味道带回家
          </h2>

          <p className="text-base md:text-lg text-white/75 leading-relaxed mb-10 max-w-xl mx-auto">
            每一件特产背后，都是一方水土的馈赠与一代匠人的坚守。
            无论是一盏云雾茶，还是一尊青花瓷，都值得您细细品味。
          </p>

          {/* CTA 按钮 */}
          <Link to="/" className="btn-capsule text-base px-8 py-4 bg-white text-jiangxi-green-dark hover:bg-jiangxi-gold hover:text-white shadow-lg shadow-black/20">
            探索更多江西之美
            <ChevronRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════ Specialties Page ════════════ */
export default function Specialties() {
  const [activeCategory, setActiveCategory] = useState<string>("全部");

  // 从数据中提取所有不重复的分类
  const allCategories = Array.from(
    new Set(specialtiesData.map((item: Specialty) => item.category))
  );

  // 根据选中分类筛选数据
  const filteredData =
    activeCategory === "全部"
      ? (specialtiesData as Specialty[])
      : (specialtiesData as Specialty[]).filter(
          (item) => item.category === activeCategory
        );

  return (
    <>
      <PageHeader />

      {/* 分类筛选栏 */}
      <section className="py-8 px-4 bg-white/70 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-100/80">
        <div className="container mx-auto max-w-5xl">
          <CategoryFilter
            categories={allCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      <ProductGrid filteredData={filteredData} />

      <BottomCTA />
    </>
  );
}

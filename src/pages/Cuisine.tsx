import { useState, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  UtensilsCrossed,
  Flame,
  MapPin,
  ChefHat,
  Soup,
  Filter,
} from "lucide-react";
import cuisineData from "@/data/cuisine.json";

/* ────────── 类型定义 ────────── */
interface CuisineItem {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  image: string;
  taste: string;
}

/* ────────── 页头区域 ────────── */
function PageHeader() {
  return (
    <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Delicious%20Jiangxi%20cuisine%20feast%20spread%2C%20warm%20toned%20Chinese%20food%20photography%2C%20steaming%20dishes%20with%20rich%20colors%2C%20traditional%20table%20setting%2C%20appetizing%20warm%20atmosphere&image_size=landscape_16_9')",
        }}
      >
        {/* 暖色渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/70 via-red-900/60 to-black/75" />
      </div>

      {/* 装饰光晕 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-orange-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-[10%] w-72 h-72 rounded-full bg-red-500/15 blur-3xl"
        />
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
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white/95 text-sm mb-8"
          >
            <UtensilsCrossed size={16} className="text-orange-300" />
            <span>舌尖上的江西</span>
          </motion.div>

          {/* 主标题 */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            赣味美食
          </h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
          >
            赣菜承袭千年饮食智慧，以鲜辣香醇为魂
            <br className="hidden sm:block" />
            从鄱阳湖畔到井冈山下，每一道佳肴都承载着江西人的热情与匠心
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────── 分类标签栏 ────────── */
function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="w-full bg-white/70 backdrop-blur-sm sticky top-[72px] z-30 border-b border-orange-100/50 shadow-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-hide"
        >
          <Filter size={16} className="text-orange-500 shrink-0 mt-0.5" />
          <button
            onClick={() => onSelectCategory("全部")}
            className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeCategory === "全部"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ────────── 美食卡片 ────────── */
function CuisineCard({ item, index }: { item: CuisineItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100/80"
    >
      {/* 图片区域 */}
      <div className="relative h-52 sm:h-56 md:h-48 lg:h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* 图片遮罩渐变 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* 分类标签 */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-orange-600 shadow-sm">
            <ChefHat size={12} />
            {item.category}
          </span>
        </div>

        {/* 口味标签 */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-medium text-white">
            <Flame size={11} className="text-orange-400" />
            {item.taste}
          </span>
        </div>
      </div>

      {/* 文字内容区域 */}
      <div className="p-5">
        {/* 名称 */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
          {item.name}
        </h3>

        {/* 产地 */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
          <MapPin size={13} className="text-orange-400 shrink-0" />
          <span>{item.origin}</span>
        </div>

        {/* 描述 */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* 底部装饰线 */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-orange-500/70">
            <Soup size={12} />
            <span>{item.taste}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────── 美食列表区域 ────────── */
function CuisineList({
  filteredItems,
}: {
  filteredItems: CuisineItem[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-container bg-jiangxi-cream/50">
      <div className="container mx-auto">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title">精选赣味</h2>
          <p className="section-subtitle">
            从瓦罐汤的醇厚到米粉的爽滑，品味江西大地最地道的风味
          </p>
          <div className="ink-divider" />
        </motion.div>

        {/* 卡片网格 */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredItems.map((item, index) => (
              <CuisineCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 空状态 */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <UtensilsCrossed size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 text-lg">暂无该分类的美食</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ════════════ 赣味美食页面 ════════════ */
export default function Cuisine() {
  const [activeCategory, setActiveCategory] = useState<string>("全部");

  // 从数据中提取所有不重复的分类
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cuisineData.forEach((item) => cats.add(item.category));
    return Array.from(cats);
  }, []);

  // 根据选中分类筛选美食
  const filteredItems = useMemo(() => {
    if (activeCategory === "全部") return cuisineData as CuisineItem[];
    return (cuisineData as CuisineItem[]).filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <>
      <PageHeader />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <CuisineList filteredItems={filteredItems} />
    </>
  );
}

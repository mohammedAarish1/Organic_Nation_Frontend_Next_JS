// Server Component (Default)
import { Calendar, Clock, Heart, Leaf, Star, Utensils } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimationGrid } from "../animations/animation2";
import { BlogsSkeleton } from "../skeletons/BlogsSkeleton";
import SectionHeader from "./SectionHeader";
import { NavigationButton } from "../buttons/NavigationButton";
import { API_BASE_URL } from "@/constants";

interface Recipe {
  _id: string;
  title: string;
  "title-url": string;
  image: string;
  date: string;
}

interface RecipeDetails {
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  servings: number;
  isVegan: boolean;
}

interface RecipeSectionProps {
  recipes: Recipe[];
  showBtn?: boolean;
}

async function getRecipes() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/recipes`, {
      // Revalidate every 1 hour
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

// Recipe details helper (can be replaced with actual API data)
const getRecipeDetails = (index: number): RecipeDetails => {
  const details = [
    {
      cookTime: "15 min",
      difficulty: "Easy" as const,
      rating: 4.8,
      servings: 2,
      isVegan: true,
    },
    {
      cookTime: "25 min",
      difficulty: "Medium" as const,
      rating: 4.5,
      servings: 4,
      isVegan: false,
    },
    {
      cookTime: "30 min",
      difficulty: "Easy" as const,
      rating: 4.9,
      servings: 6,
      isVegan: true,
    },
    {
      cookTime: "20 min",
      difficulty: "Hard" as const,
      rating: 4.2,
      servings: 3,
      isVegan: false,
    },
    {
      cookTime: "35 min",
      difficulty: "Medium" as const,
      rating: 4.7,
      servings: 4,
      isVegan: true,
    },
  ];
  return details[index % 5];
};

// Difficulty badge colors
const getDifficultyColor = (difficulty: string) => {
  const colors = {
    Easy: "bg-emerald-500",
    Medium: "bg-amber-500",
    Hard: "bg-red-500",
  };
  return colors[difficulty as keyof typeof colors] || "bg-gray-500";
};

// Recipe Card Component (Server Component)
const RecipeCard = ({ recipe, index }: { recipe: Recipe; index: number }) => {
  const details = getRecipeDetails(index);

  return (
    <Link
      href={`/recipes/${recipe["title-url"]}`}
      className="group block h-full"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-500 hover:shadow-2xl">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-gradient-to-br from-amber-50 to-emerald-50">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {details.isVegan && (
              <div className="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                <Leaf className="h-3.5 w-3.5" />
                <span>Vegan</span>
              </div>
            )}
            <div
              className={`rounded-full ${getDifficultyColor(details.difficulty)} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
            >
              {details.difficulty}
            </div>
          </div>

          {/* Heart Icon */}
          <div className="absolute top-4 right-4 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <Heart className="h-5 w-5 text-red-600" />
          </div>

          {/* Bottom Stats */}
          <div className="absolute right-4 bottom-4 left-4 flex translate-y-2 items-center justify-between opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
              <Clock className="h-4 w-4" />
              <span>{details.cookTime}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
              <Utensils className="h-3.5 w-3.5" />
              <span>{details.servings} servings</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex grow flex-col p-6">
          {/* Date and Rating */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span className="text-xs font-medium tracking-wide text-gray-600">
                {new Date(recipe.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">
                {details.rating}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-4 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-700">
            {recipe.title}
          </h3>

          {/* Recipe Info Grid */}
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-amber-50 p-3">
            <div className="text-center">
              <div className="text-sm font-semibold text-amber-900">
                {details.cookTime}
              </div>
              <div className="text-xs text-gray-600">Cook Time</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-sm font-semibold text-amber-900">
                {details.servings}
              </div>
              <div className="text-xs text-gray-600">Servings</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-sm font-semibold text-amber-900">
                {details.difficulty}
              </div>
              <div className="text-xs text-gray-600">Level</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-auto flex items-center justify-between rounded-2xl bg-amber-700 p-4 transition-all duration-300 hover:bg-amber-800">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <Utensils className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">
                Start Cooking
              </span>
            </div>
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Server Component
export default async function RecipeSection({
  // recipes,
  showBtn = false,
}: RecipeSectionProps) {
  const recipes = await getRecipes();
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-emerald-50/30 py-12 sm:py-16 lg:py-20">
      {/* Simplified Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute right-1/3 bottom-1/4 h-48 w-48 rounded-full bg-emerald-200 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-amber-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          subTitle="Fresh Recipes"
          title="Our Recipes"
          content=" Healthy, delicious recipes made from the freshest organic
            ingredients for nutritious meals"
        />

        {/* Recipe Grid - Client Component for animations */}

        {recipes.length === 0 ? (
          <BlogsSkeleton />
        ) : (
          <AnimationGrid>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe, index) => (
                <div key={recipe._id} data-index={index}>
                  <RecipeCard recipe={recipe} index={index} />
                </div>
              ))}
            </div>
          </AnimationGrid>
        )}

        {/* View All Button */}
        {showBtn && (
          <div className="mt-10 text-center sm:mt-12">
            <div className="mt-10 flex items-center justify-center sm:mt-12">
              <NavigationButton title="Explore All Recipes" path="/recipes" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

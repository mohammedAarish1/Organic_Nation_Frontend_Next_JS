import { Leaf } from "lucide-react";
import { FadeInView } from "../animations/animation2";

interface Headers {
  subTitle: string;
  title: string;
  content: string;
}

export default function SectionHeader({
  subTitle = "",
  title = "",
  content = "",
}: Headers) {
  return (
    <FadeInView>
      <div className="mb-8 text-center sm:mb-12">
        {subTitle !== "" && (
          <div className="bg-gradient-secondary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Leaf className="h-4 w-4 text-emerald-700" />
            <span className="text-sm font-semibold text-emerald-800">
              {subTitle}
            </span>
          </div>
        )}
        {title !== "" && (
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        )}
        {content !== "" && (
          <p className="text-muted mx-auto max-w-2xl text-base sm:text-lg">
            {content}
          </p>
        )}
      </div>
    </FadeInView>
  );
}

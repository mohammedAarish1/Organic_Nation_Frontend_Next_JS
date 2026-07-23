export type MediaType = "image" | "video";

export interface MediaItem {
  type: MediaType;
  src: string;
  alt?: string;
}

export interface MediaThumbnailProps {
  item: MediaItem;
  index: number;
  onClick: (index: number) => void;

  // Style customization
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
  showPlayIcon?: boolean;
  overlayClassName?: string;
}

export interface MediaViewerProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem[];
  activeIndex: number;
  onIndexChange: React.Dispatch<React.SetStateAction<number>>;
}

export interface MediaGridProps {
  images?: string[];
  videos?: string[];

  // Thumbnail customization
  thumbnailWidth?: string;
  thumbnailHeight?: string;
  thumbnailRounded?: string;
  thumbnailClassName?: string;
  overlayClassName?: string;
  showPlayIcon?: boolean;

  // Grid layout
  gridClassName?: string;
}

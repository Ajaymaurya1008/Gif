export interface GiphyResponse {
  data: GiphyGif[];
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface GiphyGif {
  type: string;
  id: string;
  url: string;
  slug: string;
  title: string;
  rating: string;
  username: string;
  source: string;
  images: {
    original: GiphyImage;
    fixed_height: GiphyImage;
    fixed_width: GiphyImage;
    fixed_height_small: GiphyImage;
    fixed_width_small: GiphyImage;
    fixed_height_still: GiphyImage;
    fixed_width_still: GiphyImage;
    preview: {
      height: string;
      width: string;
      mp4_size: string;
      mp4: string;
    };
  };
  user?: {
    avatar_url: string;
    banner_image: string;
    profile_url: string;
    username: string;
    display_name: string;
    description: string;
    is_verified: boolean;
  };
}

interface GiphyImage {
  height: string;
  width: string;
  size?: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size?: string;
  webp?: string;
}

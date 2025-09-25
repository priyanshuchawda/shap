
export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export enum GameMode {
  Explore = 'EXPLORE',
  Challenge = 'CHALLENGE',
}

export enum ChallengeType {
  Volume = 'VOLUME',
  SurfaceArea = 'SURFACE_AREA',
}

export interface Challenge {
  type: ChallengeType;
  targetValue: number;
}

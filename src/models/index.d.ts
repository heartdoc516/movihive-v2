import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerFavorite = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Favorite, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tmdbId: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFavorite = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Favorite, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tmdbId: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Favorite = LazyLoading extends LazyLoadingDisabled ? EagerFavorite : LazyFavorite

export declare const Favorite: (new (init: ModelInit<Favorite>) => Favorite) & {
  copyOf(source: Favorite, mutator: (draft: MutableModel<Favorite>) => MutableModel<Favorite> | void): Favorite;
}
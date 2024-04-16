import {
  type DefineTypeFactoryInterface,
  defineTypeFactory,
} from '@mizdra/graphql-codegen-typescript-fabbrica/helper';
import type {
  Maybe,
  Destination,
  Mutation,
  Query,
  RideHistory,
  RideHistoryInput,
  RideHistoryOutput,
} from './graphql';

export * from '@mizdra/graphql-codegen-typescript-fabbrica/helper';

export type OptionalDestination = {
  __typename?: 'Destination';
  /** 目的地の ID */
  id?: Destination['id'] | undefined;
  /** 目的地の名前 */
  name?: Destination['name'] | undefined;
};

/**
 * Define factory for {@link Destination} model.
 *
 * @param options
 * @returns factory {@link DestinationFactoryInterface}
 */
export const defineDestinationFactory: DefineTypeFactoryInterface<
  OptionalDestination,
  {}
> = defineTypeFactory;

export type OptionalMutation = {
  __typename?: 'Mutation';
  /** 乗車履歴を作成する */
  createRideHistory?: OptionalRideHistoryOutput | undefined;
};

/**
 * Define factory for {@link Mutation} model.
 *
 * @param options
 * @returns factory {@link MutationFactoryInterface}
 */
export const defineMutationFactory: DefineTypeFactoryInterface<
  OptionalMutation,
  {}
> = defineTypeFactory;

export type OptionalQuery = {
  __typename?: 'Query';
  /** 検索文字列にマッチする目的地の候補 */
  destinationCandidates?: OptionalDestination[] | undefined;
  /** 乗車履歴 */
  rideHistories?: OptionalRideHistory[] | undefined;
};

/**
 * Define factory for {@link Query} model.
 *
 * @param options
 * @returns factory {@link QueryFactoryInterface}
 */
export const defineQueryFactory: DefineTypeFactoryInterface<
  OptionalQuery,
  {}
> = defineTypeFactory;

export type OptionalRideHistory = {
  __typename?: 'RideHistory';
  /** 乗車履歴の ID */
  id?: RideHistory['id'] | undefined;
  /** 目的地 */
  destination?: OptionalDestination | undefined;
};

/**
 * Define factory for {@link RideHistory} model.
 *
 * @param options
 * @returns factory {@link RideHistoryFactoryInterface}
 */
export const defineRideHistoryFactory: DefineTypeFactoryInterface<
  OptionalRideHistory,
  {}
> = defineTypeFactory;

export type OptionalRideHistoryInput = {
  __typename?: 'RideHistoryInput';
  /** 目的地の名前 */
  name?: RideHistoryInput['name'] | undefined;
};

/**
 * Define factory for {@link RideHistoryInput} model.
 *
 * @param options
 * @returns factory {@link RideHistoryInputFactoryInterface}
 */
export const defineRideHistoryInputFactory: DefineTypeFactoryInterface<
  OptionalRideHistoryInput,
  {}
> = defineTypeFactory;

export type OptionalRideHistoryOutput = {
  __typename?: 'RideHistoryOutput';
  /** 乗車履歴の ID */
  id?: RideHistoryOutput['id'] | undefined;
  /** 目的地 */
  name?: RideHistoryOutput['name'] | undefined;
};

/**
 * Define factory for {@link RideHistoryOutput} model.
 *
 * @param options
 * @returns factory {@link RideHistoryOutputFactoryInterface}
 */
export const defineRideHistoryOutputFactory: DefineTypeFactoryInterface<
  OptionalRideHistoryOutput,
  {}
> = defineTypeFactory;


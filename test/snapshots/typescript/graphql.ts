/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Destination = {
  __typename?: 'Destination';
  /** 目的地の ID */
  id: Scalars['ID']['output'];
  /** 目的地の名前 */
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 乗車履歴を作成する */
  createRideHistory: RideHistoryOutput;
};


export type MutationCreateRideHistoryArgs = {
  input: RideHistoryInput;
};

export type Query = {
  __typename?: 'Query';
  /** 検索文字列にマッチする目的地の候補 */
  destinationCandidates: Array<Destination>;
  /** 乗車履歴 */
  rideHistories: Array<RideHistory>;
};


export type QueryDestinationCandidatesArgs = {
  text: Scalars['String']['input'];
};

export type RideHistory = {
  __typename?: 'RideHistory';
  /** 目的地 */
  destination: Destination;
  /** 乗車履歴の ID */
  id: Scalars['ID']['output'];
};

export type RideHistoryInput = {
  /** 目的地の名前 */
  name: Scalars['String']['input'];
};

export type RideHistoryOutput = {
  __typename?: 'RideHistoryOutput';
  /** 乗車履歴の ID */
  id: Scalars['ID']['output'];
  /** 目的地 */
  name: Scalars['String']['output'];
};

export type ListDestinationCandidatesQueryVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type ListDestinationCandidatesQuery = { __typename?: 'Query', destinationCandidates: Array<{ __typename?: 'Destination', id: string, name: string }> };

export type ListRideHistoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListRideHistoriesQuery = { __typename?: 'Query', rideHistories: Array<{ __typename?: 'RideHistory', id: string, destination: { __typename?: 'Destination', id: string, name: string } }> };

export type CreateRideHistoryMutationVariables = Exact<{
  desinationName: Scalars['String']['input'];
}>;


export type CreateRideHistoryMutation = { __typename?: 'Mutation', createRideHistory: { __typename?: 'RideHistoryOutput', id: string, name: string } };


export const ListDestinationCandidatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListDestinationCandidates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"destinationCandidates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ListDestinationCandidatesQuery, ListDestinationCandidatesQueryVariables>;
export const ListRideHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListRideHistories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rideHistories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"destination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListRideHistoriesQuery, ListRideHistoriesQueryVariables>;
export const CreateRideHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRideHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"desinationName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRideHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"desinationName"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateRideHistoryMutation, CreateRideHistoryMutationVariables>;
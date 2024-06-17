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

export type CreateFooUrlError = CreateFooUrlErrorDetail;

export enum CreateFooUrlErrorCode {
  FailedToCreateFooUrl = 'FAILED_TO_CREATE_FOO_URL'
}

export type CreateFooUrlErrorDetail = Error & {
  __typename?: 'CreateFooURLErrorDetail';
  code: CreateFooUrlErrorCode;
  localizedMessage: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

/** Specified Error type for createRideHistory mutation. */
export type CreateRideHistoryErrorDetails = Error & {
  __typename?: 'CreateRideHistoryErrorDetails';
  code: Scalars['Int']['output'];
  localizedMessage: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Destination = {
  __typename?: 'Destination';
  /** ID of the destination. */
  id: Scalars['ID']['output'];
  /** Name of the destination. */
  name: Scalars['String']['output'];
  /** Type of the destination. */
  type: DestinationType;
};

export enum DestinationType {
  /** Airport */
  Airport = 'AIRPORT',
  /** City */
  City = 'CITY',
  /** Station */
  Station = 'STATION'
}

/** Error interface */
export type Error = {
  /** Localized error message. */
  localizedMessage: Scalars['String']['output'];
  /** Error message. */
  message: Scalars['String']['output'];
};

export type ErrorUnion = CreateRideHistoryErrorDetails | TextError;

export type FooUrlInput = {
  /** Foo URL */
  URL: Scalars['String']['input'];
};

export type FooUrlPayload = {
  __typename?: 'FooURLPayload';
  /** Foo URL */
  URL: Scalars['String']['output'];
  /** Errors */
  errors: Array<CreateFooUrlError>;
};

/**
 * namingConvention test
 * - URL
 * - Create*
 */
export type FooUrlResource = {
  __typename?: 'FooURLResource';
  /** Foo URL */
  URL: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create Foo URL */
  createFooURL: FooUrlPayload;
  /** Create Ride History */
  createRideHistory: RideHistoryOutput;
};


export type MutationCreateFooUrlArgs = {
  input: FooUrlInput;
};


export type MutationCreateRideHistoryArgs = {
  input: RideHistoryInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get the list of destination candidates. */
  destinationCandidates: Array<Destination>;
  /** Get the list of ride histories. */
  rideHistories: Array<RideHistory>;
};


export type QueryDestinationCandidatesArgs = {
  text: Scalars['String']['input'];
};

export type RideHistory = {
  __typename?: 'RideHistory';
  /** Destination of the ride history. */
  destination: Destination;
  /** ID of the ride history. */
  id: Scalars['ID']['output'];
};

export type RideHistoryInput = {
  /** Name of the destination. */
  name: Scalars['String']['input'];
};

export type RideHistoryOutput = {
  __typename?: 'RideHistoryOutput';
  /** Error. */
  errors: Array<ErrorUnion>;
  /** ID of the ride history. */
  id: Scalars['ID']['output'];
  /** Name of the destination. */
  name: Scalars['String']['output'];
};

export type TextError = Error & {
  __typename?: 'TextError';
  /** Localized error message. */
  localizedMessage: Scalars['String']['output'];
  /** Error message. */
  message: Scalars['String']['output'];
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

export type CreateFooUrlMutationVariables = Exact<{
  input: FooUrlInput;
}>;


export type CreateFooUrlMutation = { __typename?: 'Mutation', createFooURL: { __typename?: 'FooURLPayload', URL: string, errors: Array<{ __typename?: 'CreateFooURLErrorDetail', message: string, code: CreateFooUrlErrorCode, localizedMessage: string }> } };


export const ListDestinationCandidatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListDestinationCandidates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"destinationCandidates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ListDestinationCandidatesQuery, ListDestinationCandidatesQueryVariables>;
export const ListRideHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListRideHistories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rideHistories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"destination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListRideHistoriesQuery, ListRideHistoriesQueryVariables>;
export const CreateRideHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRideHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"desinationName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRideHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"desinationName"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateRideHistoryMutation, CreateRideHistoryMutationVariables>;
export const CreateFooUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFooURL"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FooURLInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFooURL"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFooURLErrorDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"localizedMessage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateFooUrlMutation, CreateFooUrlMutationVariables>;
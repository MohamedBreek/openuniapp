import React from "react";
import { FlatList, FlatListProps } from "react-native";

export type FlashListProps<ItemType> = FlatListProps<ItemType> & {
  estimatedItemSize?: number;
};

export type FlashListRef<ItemType> = FlatList<ItemType>;

export function FlashList<ItemType>(props: FlashListProps<ItemType>) {
  const { estimatedItemSize: _ignored, ...rest } = props;
  return <FlatList {...(rest as FlatListProps<ItemType>)} />;
}

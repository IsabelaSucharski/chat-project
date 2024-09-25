/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";
import { ITagsResponse } from "../../@types";
import { APITags } from "../../api";

interface TagsContextProps {
  tagsList: ITagsResponse[] | any;
  setTagsList(tagsList: ITagsResponse[] | any): void;
  tagsCount: number;
  setTagsCount(count: number): void;
  handleTagsCount: () => void;
}

const TagsContext = createContext<TagsContextProps | any>(
  {} as TagsContextProps
);

interface TagsProviderProps {
  children: React.ReactNode;
}

export const TagsProvider: React.FC<TagsProviderProps> = ({ children }) => {
  const [tagsList, setTagsList] = useState<ITagsResponse[] | any[]>([]);
  const [tagsCount, setTagsCount] = useState<number | any>(0);

  const handleTagsCount = async () => {
    const params = {
      bot: "rh",
      query: "",
    };
    const { amount } = await APITags.getTagsCount(params);
    setTagsCount(amount);
  };

  const context = {
    tagsList,
    setTagsList,
    tagsCount,
    setTagsCount,
    handleTagsCount,
  };

  return (
    <TagsContext.Provider value={context}>{children}</TagsContext.Provider>
  );
};

export const useTags = (): TagsContextProps => {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error("useTags must be used within an TagsProvider");
  }

  return context;
};

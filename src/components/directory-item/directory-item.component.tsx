import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

export type DirectoryCategory = {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
};

export type DirectoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

import SuccessCircleFill from '../../../assets/Icons/successCircleFill';
import { ParamText } from '../../components/Text';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import UpdateCircleFill from '../../../assets/Icons/updateCircleFill';
import TrashIcon from '../../../assets/Icons/trashIcon';

export enum ContentType {
	update = 'update',
	create = 'create',
	delete = 'delete',
}

type SheetContentType = {
	contentType: ContentType | undefined;
};

export const SheetContent: React.FC<SheetContentType> = ({ contentType }) => {
	const { t } = useTranslation();
	const { TextTheme } = useTheme();

	const renderIcon = () => {
		switch (contentType) {
			case ContentType.create:
				return <SuccessCircleFill />;
			case ContentType.update:
				return <UpdateCircleFill />;
			case ContentType.delete:
				return <TrashIcon />;
		}
	};

	const renderText = () => {
		switch (contentType) {
			case ContentType.create:
				return t('Add-Address.add-success');
			case ContentType.update:
				return t('Add-Address.update-success');
			case ContentType.delete:
				return t('Add-Address.delete-success');
		}
	};

	return (
		<BottomSheetView style={{ alignItems: 'center', paddingTop: 32 }}>
			{renderIcon()}
			<ParamText style={TextTheme.bottomSheet}>{renderText()}</ParamText>
		</BottomSheetView>
	);
};

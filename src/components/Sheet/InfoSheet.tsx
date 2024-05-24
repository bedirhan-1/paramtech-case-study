import SuccessCircleFill from '../../../assets/Icons/successCircleFill';
import { ParamText } from '../Text';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import UpdateCircleFill from '../../../assets/Icons/updateCircleFill';
import TrashIcon from '../../../assets/Icons/trashIcon';
import { Button, ButtonTypes } from '../Button';
import { StyleSheet, View } from 'react-native';

export enum ContentType {
	update = 'update',
	create = 'create',
	delete = 'delete',
	alert = 'alert',
}

type SheetContentType = {
	contentType: ContentType | undefined;
	setAnswerYesOrNo: (answer: boolean) => void;
};

export const InfoSheet: React.FC<SheetContentType> = ({
	contentType,
	setAnswerYesOrNo,
}) => {
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
			case ContentType.alert:
				return null;
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
			case ContentType.alert:
				return t('Add-Address.delete-are-you-sure');
		}
	};

	return (
		<BottomSheetView style={{ paddingTop: 32 }}>
			<View style={styles.icon}>{renderIcon()}</View>
			<ParamText style={TextTheme.bottomSheet}>{renderText()}</ParamText>
			{contentType === ContentType.alert && (
				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						title={t('Global.yes')}
						type={ButtonTypes.Secondary}
						onPress={() => setAnswerYesOrNo(true)}
					/>
					<Button
						style={[styles.button, { marginLeft: 10 }]}
						title={t('Global.no')}
						type={ButtonTypes.Primary}
						onPress={() => setAnswerYesOrNo(false)}
					/>
				</View>
			)}
		</BottomSheetView>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		padding: 20,
		flexDirection: 'row',
	},
	button: {
		flex: 1,
	},
	icon: {
		alignItems: 'center',
	},
});
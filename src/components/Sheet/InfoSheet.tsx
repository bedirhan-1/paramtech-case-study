import React, { Dispatch, SetStateAction, forwardRef } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { RootState } from '../../store/store';
import { StatusTypes } from '../../types/addressSliceTypes';
import { useTheme } from '../../hooks/useTheme';
import { Button, ButtonTypes } from '../Button';
import SuccessCircleFill from '../../../assets/Icons/successCircleFill';
import UpdateCircleFill from '../../../assets/Icons/updateCircleFill';
import TrashIcon from '../../../assets/Icons/trashIcon';
import { ParamText } from '../Text';
import Error from '../../../assets/Icons/error';

export enum ContentType {
	update = 'update',
	create = 'create',
	delete = 'delete',
	alert = 'alert',
}

type SheetContentType = {
	contentType: ContentType | undefined;
	setAnswerYesOrNo: (answer: boolean) => void;
	snapPoints: string[];
	index: number;
	onChange: Dispatch<SetStateAction<number>>;
};

export const InfoSheet = forwardRef<BottomSheetMethods, SheetContentType>(
	({ contentType, setAnswerYesOrNo, onChange, index, snapPoints }, ref) => {
		const { t } = useTranslation();
		const { TextTheme, ColorPallet } = useTheme();
		const { status, error } = useSelector((state: RootState) => state.address);

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
				default:
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
				default:
					return '';
			}
		};

		return (
			<BottomSheet
				snapPoints={snapPoints}
				ref={ref}
				index={index}
				handleIndicatorStyle={{
					backgroundColor: ColorPallet.grayscale.lightGrey,
				}}
				onChange={onChange}
			>
				<BottomSheetView style={styles.bottomSheetView}>
					{status === StatusTypes.loading ? (
						<ActivityIndicator size="large" color={ColorPallet.brand.primary} />
					) : status === StatusTypes.succeeded ? (
						<BottomSheetView>
							<View style={styles.icon}>{renderIcon()}</View>
							<ParamText style={TextTheme.bottomSheet}>
								{renderText()}
							</ParamText>
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
					) : StatusTypes.failed ? (
						<BottomSheetView>
							<View style={styles.icon}>
								<Error fill={ColorPallet.brand.error} />
							</View>
							<ParamText style={styles.errorText}>
								{error ? t(error) : t('Error.occured')}
							</ParamText>
							<View style={styles.buttonContainer}>
								<Button
									style={styles.button}
									title={t('Global.ok')}
									type={ButtonTypes.Secondary}
									onPress={() => setAnswerYesOrNo(false)}
								/>
							</View>
						</BottomSheetView>
					) : null}
				</BottomSheetView>
			</BottomSheet>
		);
	},
);

const styles = StyleSheet.create({
	bottomSheetView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		alignItems: 'center',
	},
	buttonContainer: {
		padding: 20,
		flexDirection: 'row',
	},
	button: {
		flex: 1,
	},
	errorText: {
		textAlign: 'center',
		paddingHorizontal: 20,
	},
});

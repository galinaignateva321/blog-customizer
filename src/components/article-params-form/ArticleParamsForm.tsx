import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { SyntheticEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: any) => void;
};
export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLElement>(null);
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

	const formOpenHandler = () => {
		setIsOpenForm(!isOpenForm);
	};

	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef,
		onClose: formOpenHandler,
		onChange: setIsOpenForm,
	});

	const [newFontColor, setNewFontColor] = useState(
		currentArticleState.fontColor
	);

	const [newFontSize, setNewFontSize] = useState(
		currentArticleState.fontSizeOption
	);

	const [newFontFamily, setNewFontFamily] = useState(
		currentArticleState.fontFamilyOption
	);

	const [newBackground, setNewBackground] = useState(
		currentArticleState.backgroundColor
	);

	const [newContentWidth, setNewContentWidth] = useState(
		currentArticleState.contentWidth
	);

	//сабмит формы
	const formSubmitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		setCurrentArticleState({
			...currentArticleState,
			fontFamilyOption: newFontFamily,
			fontColor: newFontColor,
			backgroundColor: newBackground,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSize,
		});
	};

	//ресет формы
	const formResetHandler = () => {
		setCurrentArticleState({
			...currentArticleState,
			fontFamilyOption: defaultArticleState,
			fontColor: defaultArticleState,
			backgroundColor: defaultArticleState,
			contentWidth: defaultArticleState,
			fontSizeOption: defaultArticleState,
		});
		setNewFontFamily(defaultArticleState.fontFamilyOption);
		setNewFontColor(defaultArticleState.fontColor);
		setNewBackground(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
		setNewFontSize(defaultArticleState.fontSizeOption);
	};

	return (
		<>
			<ArrowButton onClick={formOpenHandler} isOpen={isOpenForm} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form onSubmit={formSubmitHandler} className={styles.form}>
					<Text weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={newFontFamily}
						title='цвет шрифта'
						onChange={setNewFontFamily}
					/>
					<RadioGroup
						name='123'
						title='размер шрифта'
						options={fontSizeOptions}
						onChange={setNewFontSize}
						selected={newFontSize}
					/>
					<Select
						options={fontColors}
						selected={newFontColor}
						title='цвет шрифта'
						onChange={setNewFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={newBackground}
						title='цвет фона'
						onChange={setNewBackground}
					/>
					<Select
						options={contentWidthArr}
						selected={newContentWidth}
						title='Ширина контента'
						onChange={setNewContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={formResetHandler} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

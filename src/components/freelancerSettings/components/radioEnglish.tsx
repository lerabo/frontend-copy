import { RadioLabel } from 'components/clientSettings/clentSettings.styles';
import { t } from 'i18next';

interface Props {
	selected: string | undefined;
	handleChange: (level: string) => void;
	level: string;
	index: number;
}

const EnglishRadio = (props: Props) => {
	const { selected, handleChange, level, index } = props;
	return (
		<RadioLabel className="btn btn-outline-warning" htmlFor={`btnradio${index}`}>
			<input
				type="radio"
				className="btn-check"
				name="btnradio"
				id={`btnradio${index}`}
				autoComplete="off"
				checked={selected === level}
				onChange={() => handleChange(level)}
			/>
			{`${t(`ProfileEdit.englishLevelLabels.${level}`)}`}
		</RadioLabel>
	);
};
export default EnglishRadio;

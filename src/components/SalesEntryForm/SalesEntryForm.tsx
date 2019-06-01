import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {Questions, QuestionValues} from '../../State';
import {whileStatement} from "@babel/types";

const ShortNames = ['total_length',
'total_depth',
'total_height',
'cab_quantity',
'cab_fl',
'cab_fw',
'cab_sl',
'cab_sw',
'cab_bl',
'cab_bw',
'cab_mt',
'paint' ,
'doors_mt'];


interface InterfaceProps {
	users?: any;
	some_data?: any;
	category_id?: number;
	category_title?: string;
	secondary_categories?: any;
	questions?: Questions[];
	questionValues: Map<number, QuestionValues>;
}

interface IState {
	doesContainShow?: boolean;
	questionValues?: Map<number, QuestionValues>;
	currentQuestionIdx?: number;
}

export class SalesEntryForm extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {doesContainShow: false, questionValues: this.props.questionValues, currentQuestionIdx: 0};
	}

	private handleAccordionToggleClick(e: any, aId: string) {
		const el = document.getElementById(aId);
		el.classList.toggle('show');
		if (el && el.classList.contains('show')) {
			this.setState({doesContainShow: true});
		} else {
			this.setState({doesContainShow: false});
		}
	}

	shouldComponentUpdate(nextProps: InterfaceProps, nextState: IState) {
		// did any of the question responses change?
		let didToggle = this.state.doesContainShow !== nextState.doesContainShow;


		const shouldRerender: boolean = !didToggle;
		// console.log(shouldRerender);
		return shouldRerender;
	}

	private createNewRow(questions: any) {
		return (
			<div className={'row'}>
				{questions}
			</div>
		);
	}

	private buildHeader(category: string) {
		return (<h5>{category}</h5>);
	}

	private injectGroupingInput(question: Questions, value: any, classyMcClasserson: string) {
		return (
			<div className={classyMcClasserson}>
				<input
					value={this.state.questionValues.get(question.q_id)[question['short_name']]}
					onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
					type='text'
					placeholder={question['text']}
					className='form-control'
				/>
			</div>
		);
	}

	private questionBuilder() {
		if (this.props.questions) {
			const maxQsPerRow = 2;
			const classyClass = `col-md-${12/maxQsPerRow} mb-3`;
			const eles = this.props.questions.map((question: any, index: number) => {
				if (question.cat_fk === this.props.category_id) {
					let value = '';
					if (this.state.questionValues.size > 1) {
						value = this.state.questionValues.get(question.q_id)[question['short_name']];
					}
					return (
						<div className={'row'}>
							{this.injectGroupingInput(question, value, classyClass)}
						</div>
					);
				}
			});
			// for each secondary category
			let groupedSubCatInputs = this.props.secondary_categories.map((sc: any) => {
				// - grab the questions that correspond to that category
				let filteredQs: any = this.props.questions.filter((filter: any) => filter.cat_fk === sc.category_id);

				// - construct a header
				const header = this.buildHeader(sc.category);

				// unique groups will be built via the questions.grouping
				const uniqueGroups: number[] = Array.from(new Set(filteredQs.map((item: any) => item.grouping)));
				const divRowQuestionsByGrouping = uniqueGroups.map((groupNum: number) => {
					// for each unique grouping
					//  - get questions that are in the current grouping
					let groupFilteredQs: any = filteredQs.filter((filter: any) => filter.grouping === groupNum);

					//  - construct the questions inputs
					const builtQuestions = groupFilteredQs.map((q: any) => {
						let value = '';
						if (this.state.questionValues.size > 1) {
							value = ''
						}
						return this.injectGroupingInput(q, value, classyClass);
					});
					return (
						this.createNewRow(builtQuestions)
					);
				});
				if (divRowQuestionsByGrouping.length > 0) {
					return (
						<div>
							{header}
							{divRowQuestionsByGrouping}
						</div>
					)
				}
			});
			groupedSubCatInputs = [].concat.apply([], groupedSubCatInputs);

			if (groupedSubCatInputs.length > 0) {
				return (eles.concat.apply([], groupedSubCatInputs));
			} else {
				return (eles);
			}
		}
	}

	public render() {
		const {questions, category_id}: any = this.props;
		if (category_id && questions) {
			return this.renderCard(questions);
		} else {
			return null;
		}
	}

	private renderCard(questions: Questions[]) {
		return (
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey={this.props.category_id.toString()}
				                  onClick={(e) => this.handleAccordionToggleClick(e, `accord-${this.props.category_id.toString()}`)}>
					{this.props.category_title}
					<span className={'floater-rght'} id={'accord-icon-0'}>
						{
							this.state.doesContainShow ?
								<FontAwesomeIcon icon={faLongArrowAltUp}/> :
								<FontAwesomeIcon icon={faLongArrowAltDown}/>
						}
					</span>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={this.props.category_id.toString()}
				                    id={`accord-${this.props.category_id.toString()}`}>
					<Card.Body>
						{!!questions && this.questionBuilder()}
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		);
	}

	private static propKey(propertyName: string, value: any): object {
		return {[propertyName]: value};
	}

	private dynPropKey(qVal: QuestionValues, propertyName: string, value: any): object {
		return {[propertyName]: value};
	}

	private setStateWithEvent(event: any, columnType: string): void {
		this.setState(SalesEntryForm.propKey(columnType, (event.target as any).value));
	}

	private setDynStateWithEvent(event: any, index: number, columnType: string): void {
		this.setState({ questionValues: this.onUpdateItem(index, columnType, (event.target as any).value) });
	}

	private onUpdateItem = (i: number, propName: string, value: any) => {
		const myList = this.state.questionValues;
		myList.set(i, {[propName]: value});
		return myList;
	}
}

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
	all_categories?: any;
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

	componentDidUpdate(prevProps: Readonly<InterfaceProps>, prevState: Readonly<IState>, snapshot?: any): void {
		console.log('did update?');
	}

	componentDidMount(): void {
		const currCategory = this.props.all_categories.filter((f: any) => f.category_id === this.props.category_id);
		const element = document.getElementById(`parent-question-${currCategory[0].category_id}`);
		if (element.childElementCount > 1) {
			element.classList.add('sales-form-card-overflow-height-300');
		} else {
			element.classList.add('sales-form-card-overflow-height-auto');
		}
	}

	shouldComponentUpdate(nextProps: InterfaceProps, nextState: IState) {
		let didToggle = this.state.doesContainShow !== nextState.doesContainShow;

		const shouldRerender: boolean = !didToggle;
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

	private injectGroupingInput(question: any, classyMcClasserson: string) {
		console.log(question);
		return (
			<div className={classyMcClasserson}>
				<label htmlFor={question['short_name']}>{question['text']}</label>
				<input
					id={question['short_name']}
					value={this.state.questionValues.get(question.q_id)[question['short_name']]}
					onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
					type='text'
					placeholder={question['tooltip']}
					className='form-control'
				/>
			</div>
		);
	}

	private recursivelyBuildQuestions(currCategory: any, groupedInputs?: any) {
		const maxQsPerRow = 2;
		const classyClass = `col-md-${12/maxQsPerRow} mb-3`;
		if(currCategory) {
			// for each category
			let groupedSubCatInputs = currCategory.map((sc: any) => {
				// - grab the questions that correspond to that category
				let filteredQs: any = this.props.questions.filter((filter: any) => filter.cat_fk === sc.category_id);

				console.log('---------- '+ sc.category +' --------------');
				// - construct a header
				const header = sc.category_hierarchy > 1 ? this.buildHeader(sc.category) : null;

				// unique groups will be built via the questions.grouping
				const uniqueGroups: number[] = Array.from(new Set(filteredQs.map((item: any) => item.grouping)));

				let divRowQuestionsByGrouping = uniqueGroups.map((groupNum: number) => {
					// for each unique grouping
					//  - get questions that are in the current grouping
					let groupFilteredQs: any = filteredQs.filter((filter: any) => filter.grouping === groupNum);

					//  - construct the questions inputs
					const builtQuestions = groupFilteredQs.map((q: any) => {
						return this.injectGroupingInput(q, classyClass);
					});
					return ( this.createNewRow(builtQuestions) );
				});
				let subCats: any = this.props.all_categories.filter((filter: any) => filter.belongs_to === sc.category_id);
				if (subCats.length > 0) {
					return this.recursivelyBuildQuestions(subCats, divRowQuestionsByGrouping);
				} else {
					let concatInputs;
					if (groupedInputs !== undefined) {
						concatInputs = groupedInputs.concat(header, divRowQuestionsByGrouping);
					} else {
						concatInputs = divRowQuestionsByGrouping;
					}
					if (concatInputs.length > 0) {
						return (
							<div>
								{concatInputs}
							</div>
						)
					}
				}
			});
			return [].concat.apply([], groupedSubCatInputs);
		}
	}

	private questionBuilder() {
		if (this.props.questions) {
			const currCategory = this.props.all_categories.filter((f: any) => f.category_id === this.props.category_id);
			return (
				<div id={`parent-question-${currCategory[0].category_id}`} >
					{this.recursivelyBuildQuestions(currCategory)}
				</div>
			);
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
					{/* TODO: not working properly due to state should update */
						/*<span className={'floater-rght'} id={'accord-icon-0'}>
						{
							this.state.doesContainShow ?
								<FontAwesomeIcon icon={faLongArrowAltUp}/> :
								<FontAwesomeIcon icon={faLongArrowAltDown}/>
						}
					</span>*/}
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={this.props.category_id.toString()}
				                    id={`accord-${this.props.category_id.toString()}`}>
					<Card.Body className={'nopadding'}>
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

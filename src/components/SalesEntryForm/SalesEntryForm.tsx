import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {Questions, QuestionValues} from '../../State';

interface InterfaceProps {
	users?: any;
	some_data?: any;
	category_id?: number;
	category_title?: string;
	secondary_categories?: any;
	questions?: Questions[];
	questionValues: QuestionValues[];
}

interface IState {
	doesContainShow?: boolean;
	questionValues?: QuestionValues[];
}

export class SalesEntryForm extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {doesContainShow: false, questionValues: this.props.questionValues};
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

	private questionBuilder() {
		if (this.props.questions) {
			const eles = this.props.questions.map((question: Questions, index: number) => {
				if (question.cat_fk === this.props.category_id) {
					let value = '';
					if (this.state.questionValues.length > 1) {
						value = this.state.questionValues[index][question['short_name']];
					}
					return (
						<input
							value={value}
							onChange={(event: any) => this.setDynStateWithEvent(event, index, question['short_name'])}
							type='text'
							placeholder={question['text']}
							className='form-control'
						/>
					);
				}
			});
			let secondaryQs = this.props.secondary_categories.map((sc: any) => {
				return this.props.questions.filter((filter: any) => filter.cat_fk === sc.category_id);
			});
			secondaryQs = [].concat.apply([], secondaryQs);
			let prev_cat_fk: number;
			let cat_fk_idx = 0;
			const moreEles = secondaryQs.map((q: Questions, index: number) => {
				let value = '';
				if (this.state.questionValues.length > 1) {
					value = this.state.questionValues[index][q['short_name']];
				}
				if (index === 0) {
					prev_cat_fk = this.props.secondary_categories[cat_fk_idx].category_id;
					return (
						<div><h5>{this.props.secondary_categories[cat_fk_idx].category}</h5>
						<input
							value={value}
							onChange={(event: any) => this.setDynStateWithEvent(event, index, q['short_name'])}
							type='text'
							placeholder={q['text']}
							className='form-control'
						/>
						</div>
					);
				} else if (prev_cat_fk !== q.cat_fk) {
					cat_fk_idx += 1;
					return (
						<div><h5>{this.props.secondary_categories[cat_fk_idx].category}</h5>
							<input
								value={value}
								onChange={(event: any) => this.setDynStateWithEvent(event, index, q['short_name'])}
								type='text'
								placeholder={q['text']}
								className='form-control'
							/>
						</div>
					);
				} else {
					return (
						<input
							value={value}
							onChange={(event: any) => this.setDynStateWithEvent(event, index, q['short_name'])}
							type='text'
							placeholder={q['text']}
							className='form-control'
						/>
					);
				}

			});
			if (moreEles.length > 0) {
				return (eles.concat.apply([], moreEles));
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
		this.setState({questionValues: this.onUpdateItem(index, columnType, (event.target as any).value)});
	}

	private onUpdateItem = (i: number, propName: string, value: any) => {
		const list: QuestionValues[] = this.state.questionValues.map((item, j) => {
			if (j === i) {
				return this.dynPropKey(item, propName, value);
			} else {
				return item;
			}
		}) as QuestionValues[];
		return list;
	}
}

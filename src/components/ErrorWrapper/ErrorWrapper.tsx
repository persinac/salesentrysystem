import * as React from "react";

interface InterfaceProps {
	errorMessage?: string;
	id?: string;
}

export class ErrorWrapper extends React.Component<InterfaceProps> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return this.wrapError();
	}

	private wrapError() {
		if (this.props.errorMessage.length > 0) {
			this.addInputFieldStyle();
			return (
				<div>
					{this.ErrorValidationLabel(this.props.errorMessage)}
				</div>
			)
		} else {
			this.removeInputFieldStyle();
			return null;
		}
	}

	private addInputFieldStyle(): void {
		const el = document
			.getElementById(this.props.id);

		if (el) {
			el.classList.add('error');
		}
	}

	private removeInputFieldStyle(): void {
		const el = document
			.getElementById(this.props.id);

		if (el) {
			el.classList.remove('error');
		}
	}

	private ErrorValidationLabel = (txtLbl: string) => (
		<label htmlFor={this.props.id} style={{ color: "red" }}>
			{txtLbl}
		</label>
	);
}
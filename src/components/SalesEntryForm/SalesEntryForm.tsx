import * as React from "react";

interface InterfaceProps {
	users?: any;
	some_data?: any;
}

export class SalesEntryForm extends React.Component<InterfaceProps, {}> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		const {users, some_data}: any = this.props;
		return (
			<div>
				<h3 className={'mb-3'}>Sales Order Numbers</h3>
				<div>
					<ul>
						{!!some_data && Object.keys(some_data).map(key => {
							return <li key={key}>{some_data[key].order_num}</li>;
						})}
					</ul>
				</div>
			</div>
		);
	}
}

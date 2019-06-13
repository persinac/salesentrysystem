import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Nav from "react-bootstrap/Nav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDungeon} from '@fortawesome/free-solid-svg-icons';
import {faSuperpowers} from "@fortawesome/free-brands-svg-icons";

export default class AdminSideNav extends React.Component {
	render() {
		return (this.returnSideNavBar());
	}

	private returnSideNavBar() {
		return (
			<Nav className={'col-md-2 d-none d-md-block bg-light sidebar'}>
				<div className={'sidebar-sticky'} id="navbarSupportedContent">
					<ul className={'nav flex-column'}>
						<li className={"nav-item active"}>
							<Link className={"nav-link"} to={ROUTES.ADMIN} onClick={(event) => {
								this.removeActiveClasses();
								(event.target as any).classList.toggle('active')
							}
							}>
								<span className={'floater-left margin-r-10'} id={'accord-icon-0'}>
									<FontAwesomeIcon icon={faDungeon}/>
								</span>
								Dashboard
							</Link>
						</li>
						<li className={"nav-item"}>
							<Link className={"nav-link"} to={ROUTES.ACCOUNT} onClick={(event) => {
								this.removeActiveClasses();
								(event.target as any).classList.toggle('active')
							}
							}>
								<span className={'floater-left margin-r-10'} id={'accord-icon-0'}>
									<FontAwesomeIcon icon={faSuperpowers}/>
								</span>
								Orders</Link>
						</li>
					</ul>
				</div>
			</Nav>
		)
	}

	private removeActiveClasses(): void {
		[...document.querySelectorAll('.active')].forEach(function(e) {
			e.classList.remove('active');
		});
	}
}


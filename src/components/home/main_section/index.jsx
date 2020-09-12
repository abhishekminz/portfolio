import React, { Component } from "react";

import NavigationPart from "./NavigationPart";
import ViewPart from "./ViewPart";
import ProjectCard from "./ProjectCard";
import Card from "./Card";

import { snapShotLooper } from "./../../../utils/reusable";
import { database } from "./../../../firebase";

class MainSection extends Component {
	state = {
		navigation: "MY WORKS",
		view: "LIST VIEW",
		contacts: {},
		projects: [],
	};

	toggleHandler = ({ key, val }) => {
		this.setState({ [key]: val });
	};

	componentDidMount() {
		database
			.ref("contacts")
			.once("value")
			.then((contactSnapShot) => {
				database
					.ref("projects")
					.orderByKey()
					.once("value")
					.then((projectSnapShot) => {
						const projectsArray = snapShotLooper(projectSnapShot);
						this.setState({
							contacts: contactSnapShot.val(),
							projects: projectsArray,
						});
					});
			})
			.catch((error) => console.log("Could not fetch the contact details"));
	}

	getContent = () => {
		const { navigation, view, projects } = this.state;
		let markup;
		if (navigation === "MY WORKS") {
			if (view === "LIST VIEW") {
				markup = (
					<React.Fragment>
						{projects
							.filter((p) => p.published === "yes")
							.map((project) => (
								<ProjectCard
									key={project.projectId}
									imageURL={project.imageURL}
									links={{ useApp: project.useApp, codeRepo: project.codeRepo }}
									heading={project.title}
									description={project.description}
									details={project.technologies}
								/>
							))}
					</React.Fragment>
				);
			} else {
				markup = (
					<div className="card-container">
						{projects
							.filter((p) => p.published === "yes")
							.map((project) => (
								<Card
									key={project.projectId}
									imageURL={project.imageURL}
									links={{ useApp: project.useApp, codeRepo: project.codeRepo }}
									heading={project.title}
								/>
							))}
					</div>
				);
			}
		} else {
			markup = (
				<div className="contact-detail">
					<div className="contact-detail__icon-container">
						<i className="icon ion-md-mail contact-detail__icon"></i>
					</div>
					<div className="contact-detail__info-container">
						<a
							href={`mailto:${this.state.contacts.email}?`}
							target="_top"
							className="contact-detail__info">
							{this.state.contacts.email}
						</a>
					</div>
					<div className="contact-detail__icon-container">
						<i className="icon ion-md-call contact-detail__icon"></i>
					</div>
					<div className="contact-detail__info-container">
						<a className="contact-detail__info">{this.state.contacts.phone}</a>
					</div>
					<div className="contact-detail__icon-container">
						<i className="icon ion-logo-github contact-detail__icon"></i>
					</div>
					<div className="contact-detail__info-container">
						<a
							href={this.state.contacts.github}
							target="_blank"
							className="contact-detail__info">
							abhishek minz
						</a>
					</div>
					<div className="contact-detail__icon-container">
						<i className="icon ion-logo-instagram contact-detail__icon"></i>
					</div>
					<div className="contact-detail__info-container">
						<a
							href={this.state.contacts.instagram}
							target="_blank"
							className="contact-detail__info">
							abhishekjohnsonminz
						</a>
					</div>
					<div className="contact-detail__icon-container">
						<i className="icon ion-logo-facebook contact-detail__icon"></i>
					</div>
					<div className="contact-detail__info-container">
						<a
							href={this.state.contacts.facebook}
							target="_blank"
							className="contact-detail__info">
							Abhishek Johnson Minz
						</a>
					</div>
				</div>
			);
		}
		return markup;
	};

	render() {
		const { navigation, view } = this.state;

		return (
			<main className="main-section">
				<NavigationPart
					navigation={navigation}
					toggleHandler={this.toggleHandler}
				/>
				<section className="project-box row">
					{navigation === "MY WORKS" ? (
						<ViewPart view={view} toggleHandler={this.toggleHandler} />
					) : null}
					<div className="project-box__container">{this.getContent()}</div>
				</section>
			</main>
		);
	}
}

export default MainSection;

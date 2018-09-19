import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TransitionMotion, spring, presets} from 'react-motion';

import CSS from '../css/modules/modal.module.css';
import {noop, click} from '../utils/componentHelpers';

const MotionStyles = {
	enter: 0,
	leave: -25
};

export default class Modal extends Component {
	static propTypes = {
		title: PropTypes.string,
		onClose: PropTypes.func,
		children: PropTypes.element.isRequired,
		active: PropTypes.array,
		id: PropTypes.string.isRequired,
		showClose: PropTypes.bool,
		size: PropTypes.string,
		fogDismiss: PropTypes.bool
	};

	static defaultProps = {
		title: '',
		onClose: noop,
		active: [],
		showClose: true,
		size: 'sm',
		fogDismiss: true
	};

	getDefaultStyles() {
		let {active, id} = this.props;

		if (!Array.isArray(active)) {
			active = [active];
		}

		return active.map(i => {
			return {
				key: id,
				style: {
					opacity: 0,
					y: MotionStyles.leave
				},
				data: i
			};
		});
	}

	getStyles() {
		let {active, id} = this.props;

		if (!Array.isArray(active)) {
			active = [active];
		}

		return active.map(i => {
			return {
				key: id,
				style: {
					opacity: spring(1, presets.gentle),
					y: spring(MotionStyles.enter, presets.gentle)
				},
				data: i
			};
		});
	}

	willEnter() {
		return {
			opacity: 0,
			y: MotionStyles.leave
		};
	}

	willLeave() {
		return {
			opacity: spring(0, presets.gentle),
			y: spring(MotionStyles.leave, presets.gentle)
		};
	}

	render() {
		const {title, children, active, size, fogDismiss, showClose, onClose, showHeader: shouldShowHeader} = this.props;
		const fogClass = active[0] ? CSS.fogActive : CSS.fog;
		const bodyClass = [CSS.body];
		const showHeader = shouldShowHeader || (title && title !== '');

		if (showHeader) {
			bodyClass.push(CSS.bodyWithHeader);
		}

		return (
			<div className={CSS.modal}>
				{fogDismiss ? <div className={fogClass} onClick={click(onClose)}/> : <div className={fogClass}/>}
				<TransitionMotion
					defaultStyles={this.getDefaultStyles()}
					styles={this.getStyles()}
					willEnter={this.willEnter}
					willLeave={this.willLeave}
				>
					{styles => {
						return (
							<div>
								{styles.map(({style, key}) => {
									const dialogStyle = {
										opacity: style.opacity,
										marginTop: `${style.y}px`
									};

									return (
										<div key={key} className={CSS[size]} style={dialogStyle}>
											<div className={CSS.inner}>
												{showClose ? (
													<div className={CSS.close}>
														<a onClick={click(onClose)} className="fa fa-close"/>
													</div>
												) : null}
												{showHeader ? (
													<div className={CSS.header}>
														<h1 className={CSS.title}>{title}</h1>
													</div>
												) : null}
												<div className={bodyClass.join(' ')}>{children}</div>
											</div>
										</div>
									);
								})}
							</div>
						);
					}}
				</TransitionMotion>
			</div>
		);
	}
}

import React, { useState } from 'react'
import {
	MdOutlineSettings,
} from 'react-icons/md'
import styles from './Navigation.module.css'

import { Apps } from '@/apps';
import { SettingsModal } from "@/pages/Notebook/SettingsModal";

const Navigation: React.FC = () => {
	const [showSettings, setShowSettings] = useState(false);
	return (
		<nav className={styles.nav}>
			<div className={styles.menu}>
				<ul>
					{Apps.map((app, index) => app.create(index))}
				</ul>
				<div className={styles.settings}>
					<a title='Settings' onClick={() => setShowSettings(true)}>
					<MdOutlineSettings className={styles.icon} />
					</a>
				</div>
			</div>
			{showSettings && <SettingsModal closeModal={() => setShowSettings(false)} />}
		</nav>
	)
}

export default Navigation

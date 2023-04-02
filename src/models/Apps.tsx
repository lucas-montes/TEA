import { NavLink, Route } from 'react-router-dom'
import { IconType } from 'react-icons/md'

import styles from '@/components/Layout/Navigation/Navigation.module.css'
import Empty from "@/pages/Empty";


export class MenuApp {
    Element: JSX.Element | React.FC
    Icon: IconType
    title: string
    path: string

    constructor(Icon: IconType, title: string, Element?: JSX.Element | React.FC, path?: string) {
        this.Element = Element ? Element : Empty
        this.Icon = Icon
        this.title = title
        this.path = path ? path : this.createPath(title)
    }

    private createPath(title:string):string{
        return title.toLowerCase()
    }
    public create( key: number): JSX.Element {
        return (
            <li title={this.title} key={key}>
						<NavLink
							className={({ isActive }) => (isActive ? styles.active : '')}
							to={this.path}
						>
							<this.Icon className={styles.icon} />
						</NavLink>
					</li>
        )
    }
    public getRoute(key: number): React.ReactElement {
        return <Route key={key} path={this.path} element={<this.Element />}/>
    }

}

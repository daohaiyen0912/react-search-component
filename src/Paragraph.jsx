import {useContext} from 'react'
import { ThemeContext } from './App'

function Paragraph() {
    const theme = useContext(ThemeContext)
    console.log(theme)
    return (
        <p className={theme}>
            Change Theme by Context
        </p>
    )
}

export default Paragraph
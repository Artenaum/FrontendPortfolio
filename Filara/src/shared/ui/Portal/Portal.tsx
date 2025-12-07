import {useEffect, useRef, type FC, type ReactNode} from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
    children: ReactNode
    targetId: string
}

const Portal: FC<PortalProps> = ({children, targetId}) => {
    const el = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
            el.current = document.createElement('div')
            targetElement.appendChild(el.current)
        }

        return () => {
            if (el.current && targetElement) {
                targetElement.removeChild(el.current)
            }
        }
    }, [targetId])

    if (!el.current) {
        return null
    }

    return ReactDOM.createPortal(children, el.current)
}

export default Portal

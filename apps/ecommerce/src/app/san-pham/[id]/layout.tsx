import BaseTemplate from '@/layout/BaseTemplate';

export default function Layout(props: { children: React.ReactNode }) {
    return <BaseTemplate>{props.children}</BaseTemplate>;
}

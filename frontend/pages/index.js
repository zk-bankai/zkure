import Interface from '../components/Interface.js';
import Script from "next/script";
const Index = () => {
    return (
        <div>
            <Script src="/snarkjs.min.js" />
            <Interface />
        </div>
    )
};

export default Index;
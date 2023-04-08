import { useParams } from 'react-router-dom';
import UserPurchase from '~/components/UserPurchase';
import UserPurchaseDetail from '~/components/UserPurchaseDetail';
import UserInfomation from '~/components/UserInfomation';
import UserChangePassword from '~/components/UserChangePassword';

function User() {
    const { menu } = useParams();
    let Comp = UserPurchase;

    switch (menu) {
        case 'purchase-history':
            Comp = UserPurchase;
            break;
        case 'purchase-detail':
            Comp = UserPurchaseDetail;
            break;
        case 'infomation':
            Comp = UserInfomation;
            break;
        case 'change-password':
            Comp = UserChangePassword;
            break;
        default: {
            Comp = UserInfomation;
        }
    }

    return <Comp />;
}
export default User;

import React from 'react';
// import 'react-native-gesture-handler';
import { ColorsApp } from '../utilities/colors';
import { ButtonBackNav } from '../screen/components';
import Settings from '../screen/app/profile/settings';
import { createStackNavigator } from '@react-navigation/stack';
// import AppTabNavigation from './AppTabNavigation';
import NotificationSettings from '../screen/app/profile/notificationSettings';
import EditProfile from '../screen/app/profile/editProfile';
import TermsAndPP from '../screen/app/profile/termsAndPP';

import { Fonts } from '../utilities/fonts';
import { TranslationKeys } from '../i18n/language';
import { useTranslation } from 'react-i18next';
import MyBookmarks from '../screen/app/profile/myBookmarks';
import MyFollowers from '../screen/app/profile/myFollowers';
import MyFollowing from '../screen/app/profile/myFollowing';
import Category from '../screen/app/search/category';
import Home from '../screen/app/home';
import HomeCRM from '../screen/app/crm/homeCRM';
import NewLead from '../screen/app/crm/newLead';
import LeadDetails from '../screen/app/crm/leadDetails';
import Followup from '../screen/app/crm/followup';
import FollowupsList from '../screen/app/crm/followupsList';
import WebScreen from '../screen/common/WebScreen';
import RemarkList from '../screen/app/crm/remarkList';
import HomeCollection from '../screen/app/collections';
import OverduePayments from '../screen/app/collections/overduePayments';
import { TypeList } from '../constants/constants';
import UpcomingPayments from '../screen/app/collections/upcomingPayments';
import CollectionPayments from '../screen/app/collections/collectionPayments';


export type AppStackRoots = {
  // AppTabNavigation: undefined;
  Home: undefined
  HomeCRM: undefined
  NewLead: undefined
  LeadDetails: undefined
  Settings: undefined;
  NotificationSettings: undefined;
  EditProfile: undefined;
  TermsAndPP: { title: string };
  MyFollowing: undefined;
  MyFollowers: undefined;
  MyBookmarks: undefined;
  Category: { title: string; id: string };
  Followup: {
    customer_id: number;
    id?: number
    followup_mode?: number;
    followup_mode_val?: string;
    followup_status?: number
    followup_status_val?: string;
    priority?: number
    priority_val?: string;
    notes?: string;
  },
  FollowupsList: { showDateList: boolean, leadId: number, customer_id: string };
  WebScreen: { title: string; url: string };
  RemarkList: { showDateList: boolean, leadId: number, customer_id: string };

  HomeCollection: undefined
  OverduePayments: { type: TypeList }
  UpcomingPayments: { type: TypeList }
  CollectionPayments: { type: TypeList }
};

// const Stack = createStackNavigator<AuthStackRoots>();
const Stack = createStackNavigator<AppStackRoots>();

const AppNavigation = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      // initialRouteName="Login"
      screenOptions={{
        gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerLeft: () => <ButtonBackNav />,
        headerStyle: {
          backgroundColor: ColorsApp.white,
          shadowColor: 'transparent',
          elevation: 0
        },
        headerTitleStyle: {
          ...Fonts.poppinsMedium17,
          fontWeight: '500'
        },
        headerTintColor: '#000',
        headerShown: false
      }}>
      {/* <Stack.Screen
        name="AppTabNavigation"
        component={AppTabNavigation}
        options={
          {
            // headerShown: false,
            // presentation: 'transparentModal',
            // ...TransitionPresets.ModalSlideFromBottomIOS,
          }
        }
      /> */}
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          title: t(TranslationKeys.HOME)
        }}
      /> */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          title: t(TranslationKeys.HOME)
        }}
      />

      <Stack.Screen
        name="HomeCRM"
        component={HomeCRM}

        options={{
          headerShown: true,
          title: 'CRM',
          headerLeft: () => <ButtonBackNav />,
          // presentation: 'transparentModal',
          // ...TransitionPresets.ModalSlideFromBottomIOS
        }}
      />
      <Stack.Screen
        name="NewLead"
        component={NewLead}
        options={{
          headerShown: true,
          title: 'Lead',
          headerLeft: () => <ButtonBackNav />,
        }}
      />
      <Stack.Screen
        name="LeadDetails"
        component={LeadDetails}
        options={{
          headerShown: true,
          title: 'User Details',
          headerLeft: () => <ButtonBackNav />,
        }}
      />
      <Stack.Screen
        name="Followup"
        component={Followup}
        options={{
          headerShown: true,
          title: 'Follow-up',
          headerLeft: () => <ButtonBackNav />,
        }}
      />
      <Stack.Screen
        name="FollowupsList"
        component={FollowupsList}
        options={{
          headerShown: true,
          title: 'Followups',
          headerLeft: () => <ButtonBackNav />,
        }}
      />
      <Stack.Screen
        name="RemarkList"
        component={RemarkList}
        options={{
          headerShown: true,
          title: 'Remarks',
          headerLeft: () => <ButtonBackNav />,
        }}
      />

      <Stack.Screen
        name="HomeCollection"
        component={HomeCollection}
        options={{
          headerShown: true,
          title: 'Collection',
          headerLeft: () => <ButtonBackNav />,
          // presentation: 'transparentModal',
          // ...TransitionPresets.ModalPresentationIOS
        }}
      />

      <Stack.Screen
        name="OverduePayments"
        component={OverduePayments}
        options={{
          headerShown: true,
          title: 'Overdue Payments',
          headerLeft: () => <ButtonBackNav />,
          // presentation: 'transparentModal',
          // ...TransitionPresets.ModalPresentationIOS
        }}
      />
      <Stack.Screen
        name="UpcomingPayments"
        component={UpcomingPayments}
        options={{
          headerShown: true,
          title: 'Upcoming Payments',
          headerLeft: () => <ButtonBackNav />,
          // presentation: 'transparentModal',
          // ...TransitionPresets.ModalPresentationIOS
        }}
      />
      <Stack.Screen
        name="CollectionPayments"
        component={CollectionPayments}
        options={{
          headerShown: true,
          title: 'Payments',
          headerLeft: () => <ButtonBackNav />,
          // presentation: 'transparentModal',
          // ...TransitionPresets.ModalPresentationIOS
        }}
      />


      <Stack.Screen
        name="WebScreen"
        component={WebScreen}
        options={{
          headerShown: true,
          title: '',
          headerLeft: () => <ButtonBackNav />,
          // presentation: 'transparentModal',
          // ...TransitionPresets.ModalPresentationIOS
        }}
      />




      {/* <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          title: t(TranslationKeys.SETTINGS)
        }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{
          headerShown: true,
          title: t(TranslationKeys.NOTIFICATION_SETTINGS)
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          title: t(TranslationKeys.EDIT_PROFILE)
        }}
      />
      <Stack.Screen
        name="TermsAndPP"
        component={TermsAndPP}
        options={{
          headerShown: true
        }}
      />
      <Stack.Screen
        name="MyFollowing"
        component={MyFollowing}
        options={{
          headerShown: true,
          title: t(TranslationKeys.FOLLOWING)
        }}
      />
      <Stack.Screen
        name="MyFollowers"
        component={MyFollowers}
        options={{
          headerShown: true,
          title: t(TranslationKeys.FOLLOWERS)
        }}
      />
      <Stack.Screen
        name="MyBookmarks"
        component={MyBookmarks}
        options={{
          headerShown: true,
          title: t(TranslationKeys.MY_BOOKMARKS)
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: true
        }}
      /> */}
    </Stack.Navigator>
  );
};
export default AppNavigation;

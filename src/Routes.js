import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  ViewProduct as ViewProductView,
  AddProduct as AddProductView,
  AddCategory as AddCategoryView,
  EditCategory as EditCategoryView,
  EditProduct as EditProductView,
  CategoryList as CategoryListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Gate as GateView,
  NotFound as NotFoundView,
  AddModel as AddModelView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={AddProductView}
        exact
        layout={MainLayout}
        path="/products/add"
      />
      <RouteWithLayout
        component={AddCategoryView}
        exact
        layout={MainLayout}
        path="/categories/add"
      />
      <RouteWithLayout
        component={EditProductView}
        exact
        layout={MainLayout}
        path="/products/:id/edit"
      />
      <RouteWithLayout
        component={EditCategoryView}
        exact
        layout={MainLayout}
        path="/categories/:id/edit"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={ViewProductView}
        exact
        layout={MainLayout}
        path="/products/:id"
      />

      <RouteWithLayout
        component={CategoryListView}
        exact
        layout={MainLayout}
        path="/categories"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={GateView}
        exact
        path="/"
        layout={MinimalLayout}
      />
      <RouteWithLayout
        component={AddModelView}
        exact
        path="/product/:id/model/add"
        layout={MainLayout}
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

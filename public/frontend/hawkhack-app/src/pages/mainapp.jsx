import React from "react";
import {About} from './about.jsx';
import {Placeholder} from './placeholder';
import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

export const Mainapp = () => {
  return (
    <div>
          <h2>Mainapp</h2>
          <p>Our Foods</p>
    </div>
  );
};



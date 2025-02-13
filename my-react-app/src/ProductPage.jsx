import React, { useEffect, useState } from "react";
import Headbar from "./Headbar";
import { useParams } from "react-router-dom";
import { Hero } from "./Prdcomponents/prdHero/Hero";
const ProductPage = () => {
    const { id } = useParams();
    return (
        <div>
            <Hero />
        </div>
    );
};
export default ProductPage;
import * as $ from 'jquery';
import Post from "@src/post";
import './styles/styles.css';
import './styles/sass.scss';
import '@src/babel';
// import json from "./assets/json.json";
import WebpackLogo from "./assets/webpack-logo.png";
// import xml from "./assets/data.xml"
import csv from "./assets/data.csv";
import React from 'react';
import {render} from 'react-dom';


const post = new Post("webpack post title", WebpackLogo);

$('pre').addClass('mycode2').html(post.toString());

const App = () => (
	<div class="container">
		<h1>Webpack Course</h1>
		<hr />
		<div class="logo"/>
		<hr />
		<pre />
		<hr />
		<div class="box">
			<div class="box__item">First Box</div>
			<div class="box__item">Second Box</div>
		</div>
	</div>
);

render(<App />, document.getElementById('app'))

// console.log('Post to string:', post.toString());
// console.log("JSON:", json);
// console.log("XML", xml);
// console.log("CSV", csv);
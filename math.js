window.addEventListener("load", ol_padding_magic);
window.addEventListener("load", import_mathjax);

function ol_padding_magic()
{
	var temp_ol = document.createElement("ol");
	var temp_li = document.createElement("li");
	temp_ol.style.listStylePosition = "inside";
	temp_li.textContent = "q";
	temp_ol.prepend(temp_li);
	document.getElementsByTagName("page")[0].prepend(temp_ol);

	var r1 = temp_ol.getBoundingClientRect();
	var textNode = temp_li.firstChild;

	var range = document.createRange();
	range.selectNodeContents(textNode);
	var r2 = range.getClientRects()[0];

	pad = (r2.left - r1.left) + "px";

	temp_ol.remove();
	temp_li.remove();

	var ols =

	Array.from(document.getElementsByTagName("ol"))
	     .forEach(ol => { ol.style.paddingLeft = pad });
}

function import_mathjax()
{
	Array.from(document.getElementsByTagName("tex"))
	     .forEach(tex => { tex.textContent = "\r" + tex.textContent + "\r"; });

	var script = document.createElement("script");
	script.src = "http://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";

	var config = 'MathJax.Hub.Config({'
	           + 'extensions: ["tex2jax.js"],'
	           + 'jax: ["input/TeX", "output/HTML-CSS"],'
	           + 'tex2jax: { inlineMath: [["\\r", "\\r"]] }'
	           + '});'
	           + 'MathJax.Hub.Startup.onload();';

	script.textContent = config;
	document.head.appendChild(script);
};

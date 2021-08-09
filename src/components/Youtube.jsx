import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = () => (
    <div id="weatherCard2">
        <h3>Storm Watch</h3> 
        <div className="video-responsive">
        <iframe id="youtube"
        width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/YfOF_ggEcRo" title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
        </div>
    </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
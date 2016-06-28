/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

module.exports  = function(app) {
    'use strict';

    var HTTP_CODE = {
        OK: 200,
        BADREQUEST: 400,
        FORBIDDEN: 403,
        NOTFOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    }

    //----------- BASIQUE RESPONSE ------------------------------------/
    function responseOK(res) {
        res.sendStatus(HTTP_CODE.OK); // equivalent to res.status(200).send('OK')
    }

    function responseBadRequest(res) {
        res.sendStatus(HTTP_CODE.BADREQUEST); // equivalent to res.status(400).send('Bad Request')
    }

    function responseForbidden(res) {
        res.sendStatus(HTTP_CODE.FORBIDDEN); // equivalent to res.status(403).send('Forbidden')
    }

    function responseNotFound(res) {
        res.sendStatus(HTTP_CODE.NOTFOUND); // equivalent to res.status(404).send('Not Found')
    }

    function reponseInternalServerError(res) {
        res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR); // equivalent to res.status(500).send('Internal Server Error')
    }
    //----------------------------------------------------------------/

    //----------- RESPONSE 200 ---------------------------------------/
    function response(res, message) {
        res.set('Content-Type', 'text/plain');
        res.status(HTTP_CODE.OK).send(message);
    }

    function responseJson(res, json) {
        res.status(HTTP_CODE.OK).json(json);
    }

    function responseHtml(res, html) {
        res.type('html');
        res.status(HTTP_CODE.OK).send(html);
    }

    function responseXml(res, xml) {
        res.type('xml');
        res.status(HTTP_CODE.OK).send(xml);
    }

    //-----------------------------------------------------------------/

    //----------- RESPONSE 400 ----------------------------------------/

    function badRequest(res, message) {
        res.set('Content-Type', 'text/plain');
        res.status(HTTP_CODE.BADREQUEST).send(message);
    }

    function badRequestJson(res, json) {
        res.status(HTTP_CODE.BADREQUEST).json(json);
    }

    function badRequestHtml(res, html) {
        res.type('html');
        res.status(HTTP_CODE.BADREQUEST).send(html);
    }

    function badRequestXml(res, xml) {
        res.type('xml');
        res.status(HTTP_CODE.BADREQUEST).send(xml);
    }
    //-----------------------------------------------------------------/

    //----------- RESPONSE 403 ----------------------------------------/

    function forbidden(res, message) {
        res.set('Content-Type', 'text/plain');
        res.status(HTTP_CODE.FORBIDDEN).send(message);
    }

    function forbiddenJson(res, json) {
        res.status(HTTP_CODE.FORBIDDEN).json(json);
    }

    function forbiddenHtml(res, html) {
        res.type('html');
        res.status(HTTP_CODE.FORBIDDEN).send(html);
    }

    function forbiddenXml(res, xml) {
        res.type('xml');
        res.status(HTTP_CODE.FORBIDDEN).send(xml);
    }

    //-----------------------------------------------------------------/


    //----------- RESPONSE 404 ----------------------------------------/

    function notFound(res, message) {
        res.set('Content-Type', 'text/plain');
        res.status(HTTP_CODE.NOTFOUND).send(message);
    }

    function notFoundJson(res, json) {
        res.status(HTTP_CODE.NOTFOUND).json(json);
    }

    function notFoundHtml(res, html) {
        res.type('html');
        res.status(HTTP_CODE.NOTFOUND).send(html);
    }

    function notFoundXml(res, xml) {
        res.type('xml');
        res.status(HTTP_CODE.NOTFOUND).send(xml);
    }
    //-----------------------------------------------------------------/


    //----------- RESPONSE 500 ----------------------------------------/
    function error(res, message) {
        res.set('Content-Type', 'text/plain');
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send(message);
    }

    function errorJson(res, json) {
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json(json);
    }

    function errorHtml(res, html) {
        res.type('html');
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send(html)
    }

    function errorXml(res, xml) {
        res.type('xml');
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send(xml);
    }

    //-----------------------------------------------------------------/



    function getCodes() {
        return HTTP_CODE;
    }

    return {
        getCodes: getCodes,
        response: response,
        responseJson: responseJson,
        responseHtml: responseHtml,
        responseXml: responseXml,
        badRequest: badRequest,
        badRequestJson: badRequestJson,
        badRequestHtml: badRequestHtml,
        badRequestXml: badRequestXml,
        forbidden: forbidden,
        forbiddenJson: forbiddenJson,
        forbiddenHtml: forbiddenHtml,
        forbiddenXml: forbiddenXml,
        notFound: notFound,
        notFoundJson: notFoundJson,
        notFoundHtml: notFoundHtml,
        notFoundXml: notFoundXml,
        error: error,
        errorJson: errorJson,
        errorHtml: errorHtml,
        errorXml: errorXml,
        responseOK: responseOK,
        responseBadRequest: responseBadRequest,
        responseForbidden: responseForbidden,
        responseNotFound: responseNotFound,
        reponseInternalServerError: reponseInternalServerError
    }
}
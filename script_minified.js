class Going {
  key = 'GOING';

  origin = '*';

  state = {
    data: null,
    carnets: null,
    enterFromUrl: null,
    parentId: null,
    roomId: null,
    token: null,
    transactionId: null,
    extendedPayment: null,
    reservationId: null,
    error: null,
    appUrl: null,
    partnerId: null,
    template: null,
    passCode: null,
    googleGtmKey: null,
    facebookPixelKey: null,
    eSlug: null,
    rSlug: null,
    rid: null,
    showBasket: false,
    embedBasket: false,
    addBasketRedirect: null,
    ticketCode: null,
    transactionHash: null,
    theme: null,
    entryListUrl: null,
    formIoId: null,
    isInNestedIframe: null,
    language: null,
  };

  auxiliaryState = {
    lastScrollPosY: null,
    wasOpen: false,
  };

  iframeLoaded = false;

  goingFunctionReplaced = false;

  activeSession = false;

  previousState = {};

  static snakeToCamel(str) {
    return str.toLowerCase().replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
  }

  run() {
    this.destroy();
    this.addMessageListener();
    this.addListeners();
    this.applyCurrentActionsFromQueue();
  }

  destroy() {
    document.removeEventListener('goingResize', this.resizeIframe);
    document.removeEventListener('goingRedirect', this.redirectIframe);
    document.removeEventListener('goingScrollIframeTo', this.scrollIframeTo);
    document.removeEventListener('goingPing', this.ping);
    document.removeEventListener('goingScrollToTop', this.scrollToIframeTop);
    document.removeEventListener(
      'goingGetIframePosition',
      this.sendLoaderPositionTop
    );
    document.removeEventListener('goingGetPositionTop', this.sendPositionTop);
    document.removeEventListener('goingSetPositionTop', this.sendPositionTop);
    document.removeEventListener('goingGetCurrentUrl', this.setCurrentUrl);
    document.removeEventListener('goingRefreshPage', this.refreshPage);
    document.removeEventListener(
      'goingRedirectEventIframe',
      this.redirectEventIframe
    );
    window.removeEventListener('beforeunload', this.receiveClose);
    window.removeEventListener('message', this.receiveMessage);
    document.removeEventListener(
      'goingGetIframeRelativeScrollPosition',
      this.sendIframeRelativeScrollPosition
    );
    document.removeEventListener(
      'goingGetIframeRelativeScrollPosition',
      this.sendIframeParentViewportHeightAndScrollPos
    );
    window.removeEventListener('scroll', this.sendIframeRelativeScrollPosition);

    document.removeEventListener('goingSetSession', this.addCloseListener);

    document.removeEventListener(
      'goingBlockScrollWhenDialogVisible',
      this.blockScrollWhenDialogVisible
    );

    document.removeEventListener(
      'goingGetNestedIframeLayoutData',
      this.toggleScrollPositionCheck.bind(this)
    );
  }

  addCloseListener() {
    window.addEventListener('beforeunload', this.receiveClose, false);
  }

  removeCloseListener() {
    window.removeEventListener('beforeunload', this.receiveClose);
    location.reload();
  }

  receiveClose = (event) => {
    if (!this.activeSession) {
      return null;
    }
    try {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
    } catch (e) {
      console.error(e);
    }
  };

  addMessageListener() {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  receiveMessage(messageEvent) {
    try {
      const event = JSON.parse(messageEvent.data);

      if (event.type === this.key) {
        const action = event.action;
        const actionName = Going.snakeToCamel(this.key + '_' + action.type);

        const newEvent = new CustomEvent(actionName, {
          detail: action.payload,
        });

        document.dispatchEvent(newEvent);
      }
    } catch (e) {}
  }

  applyCurrentActionsFromQueue() {
    const actions = window.goingQ || [];

    actions.map((action) => {
      const { type, payload } = action;

      if (type) {
        const actionName = Going.snakeToCamel(type);

        if (Object.prototype.hasOwnProperty.call(Going.prototype, actionName)) {
          this[actionName](payload);
        }
      }
    });
  }

  setRoom(roomId) {
    this.setState({
      roomId,
    });
  }

  setBasket(showBasket) {
    this.setState({
      showBasket,
    });
  }

  setGtmKey(googleGtmKey) {
    this.setState({
      googleGtmKey,
    });
  }

  setFbPixelKey(facebookPixelKey) {
    this.setState({
      facebookPixelKey,
    });
  }

  setError(error) {
    this.setState({
      error,
    });
  }

  setParent(parentId) {
    this.setState({
      parentId,
    });
  }

  setEmbedBasket(embedBasket) {
    this.setState({
      embedBasket,
    });
  }

  setAppUrl(appUrl) {
    this.setState({
      appUrl,
    });
  }

  setTransaction(transactionId) {
    this.setState({
      transactionId,
    });
  }

  setData(data) {
    this.setState({
      data,
    });
  }

  setExtendedPayment(extendedPayment) {
    this.setState({
      extendedPayment,
    });
  }

  setPassCode(passCode) {
    this.setState({
      passCode,
    });
  }

  setTicketCode(ticketCode) {
    this.setState({ ticketCode });
  }

  setTransactionHash(transactionHash) {
    this.setState({ transactionHash });
  }

  setReservation(reservationId) {
    this.setState({
      reservationId,
    });
  }

  setToken(token) {
    this.setState({
      token,
    });
  }

  setTemplate(template) {
    this.setState({
      template,
    });
  }

  setTheme(theme) {
    this.setState({
      theme,
    });
  }

  setEntryListUrl(entryListUrl) {
    this.setState({
      entryListUrl,
    });
  }

  setFormIoId(formIoId) {
    this.setState({
      formIoId,
    });
  }

  setCarnets(carnets) {
    this.setState({
      carnets,
    });
  }

  setPartnerId(partnerId) {
    this.setState({
      partnerId,
    });
  }

  setEnterFormUrl(enterFromUrl) {
    this.setState({
      enterFromUrl,
    });
  }

  setEventSlug(eSlug) {
    this.setState({
      eSlug,
    });
  }

  setRundateSlug(rSlug) {
    this.setState({
      rSlug,
    });
  }

  setEventId(rid) {
    this.setState({
      rid,
    });
  }

  setAddBasketRedirect(addBasketRedirect) {
    this.setState({
      addBasketRedirect,
    });
  }

  setIsInNestedIframe(isInNestedIframe) {
    this.setState({
      isInNestedIframe,
    });
  }

  setAuthRundateAccess(rundateAccess) {
    this.setState({
      rundateAccess,
    });
  }

  setLanguage(language) {
    this.setState({
      language,
    });
  }

  setState(stateFragment) {
    this.state = Object.assign(this.state, stateFragment);

    this.refresh();
  }

  /** These setters do not use setState so they don't refresh the iframe */

  setAuxiliaryState(stateFragment) {
    this.auxiliaryState = Object.assign(this.auxiliaryState, stateFragment);
  }

  setLastScrollPos(lastScrollPosY) {
    this.setAuxiliaryState({
      lastScrollPosY,
    });
  }

  setWasOpen(wasOpen) {
    this.setAuxiliaryState({
      wasOpen,
    });
  }

  refresh() {
    if (this.statesAreTheSame()) {
      return;
    }

    this.previousState = Object.assign({}, this.state);

    this.updateIframe();
  }

  /*
   * This is simple check if objects are the same.
   */
  statesAreTheSame() {
    const keysOfCurrentState = Object.keys(this.state);
    const keysOfPreviousState = Object.keys(this.previousState);

    // keys length are the same
    if (keysOfCurrentState.length !== keysOfPreviousState.length) {
      return false;
    }

    // keys are the same
    const keysAreTheSame = keysOfCurrentState.reduce((result, key) => {
      return result && keysOfPreviousState.indexOf(key) > -1;
    }, true);

    if (!keysAreTheSame) {
      return false;
    }

    // values are the same
    const valuesAreTheSame = keysOfCurrentState.reduce((result, key) => {
      return result && this.state[key] === this.previousState[key];
    }, true);

    return valuesAreTheSame;
  }

  newReloadIframe() {
    this.iterator = 0;
    this.goingFunctionReplaced = false;
  }

  updateIframe() {
    if (this.iframeLoaded) {
      if ((this.state.eSlug && this.state.rSlug) || this.state.rid) {
        this.iframe.src = this.prepareEventUrlForIframe();

        return;
      }

      this.iframe.src = this.prepareUrlForIframe();

      return;
    }

    if (this.state.parentId) {
      this.iframeLoaded = true;

      const parent = document.getElementById(this.state.parentId);

      this.iframe = document.createElement('iframe');
      this.iframe.src = this.prepareUrlForIframe();

      this.addPropsToIframe();

      parent.appendChild(this.iframe);
    }
  }

  getTransactionFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) =>
      this.setTransaction(value)
    );
  }

  getDataFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) => this.setData(value));
  }

  getExtendedPaymentFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) =>
      this.setExtendedPayment(value)
    );
  }

  getReservationFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) =>
      this.setReservation(value)
    );
  }

  getPassCodeFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) => this.setPassCode(value));
  }

  getTicketCodeFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) =>
      this.setTicketCode(value)
    );
  }

  getTransactionHashFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) =>
      this.setTransactionHash(value)
    );
  }

  getErrorFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) => this.setError(value));
  }

  getEventSlugFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) =>
      this.setEventSlug(value)
    );
  }

  getRundateSlugFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) =>
      this.setRundateSlug(value)
    );
  }

  getEventIdFromUrl(parameterName) {
    this.getParameterFromUrl(parameterName, (value) => this.setEventId(value));
  }

  getParameterFromUrl(parameterName, callback) {
    let search = this.state.isInNestedIframe
      ? window.top.location.search.toString()
      : document.location.search.toString();

    if (search && search.length > 1 && parameterName) {
      search = search.substr(1);
    } else {
      return;
    }

    const parts = search.split('&');

    const regexp = new RegExp('^' + parameterName + '=([a-z0-9-]+)$', 'i');

    for (let i = 0; i < parts.length; i++) {
      const matches = parts[i].match(regexp);

      if (matches) {
        return callback(matches[1]);
      }
    }
  }

  prepareUrlForIframe() {
    return (
      this.state.appUrl +
      this.useValuesFromState([
        'data',
        'roomId',
        'transactionId',
        'extendedPayment',
        'token',
        'error',
        'reservationId',
        'partnerId',
        'template',
        'theme',
        'entryListUrl',
        'formIoId',
        'carnets',
        'enterFromUrl',
        'passCode',
        'googleGtmKey',
        'facebookPixelKey',
        'showBasket',
        'embedBasket',
        'addBasketRedirect',
        'ticketCode',
        'transactionHash',
        'isInNestedIframe',
        'language',
      ])
    );
  }

  prepareEventUrlForIframe() {
    if (this.state.eSlug && this.state.rSlug) {
      return (
        this.state.appUrl +
        '/' +
        this.state.eSlug +
        '/' +
        this.state.rSlug +
        '?' +
        this.useValuesFromState([
          'data',
          'roomId',
          'transactionId',
          'extendedPayment',
          'token',
          'error',
          'reservationId',
          'partnerId',
          'template',
          'theme',
          'entryListUrl',
          'formIoId',
          'carnets',
          'enterFromUrl',
          'passCode',
          'ticketCode',
          'transactionHash',
          'googleGtmKey',
          'facebookPixelKey',
          'isInNestedIframe',
          'language',
        ])
      );
    }
    if (this.state.rid) {
      return (
        this.state.appUrl +
        '-id/' +
        this.state.rid +
        '?' +
        this.useValuesFromState([
          'data',
          'roomId',
          'transactionId',
          'extendedPayment',
          'token',
          'error',
          'reservationId',
          'partnerId',
          'template',
          'theme',
          'entryListUrl',
          'formIoId',
          'carnets',
          'enterFromUrl',
          'passCode',
          'googleGtmKey',
          'facebookPixelKey',
          'ticketCode',
          'transactionHash',
        ])
      );
    }
  }

  useValuesFromState(keys) {
    let isFirst = true;

    return keys
      .map((key) => {
        if (this.state[key]) {
          if (isFirst) {
            isFirst = false;
            return `?${key}=${this.state[key]}`;
          } else {
            return `${key}=${this.state[key]}`;
          }
        }

        return null;
      })
      .filter(Boolean)
      .join('&');
  }

  addPropsToIframe() {
    if (this.iframe) {
      this.iframe.style.border = 'none';
      this.iframe.style.width = '100%';
      this.iframe.style.height = 0;
      this.iframe.scrolling = 'no';
      this.iframe.overflow = 'hidden';
      // this.iframe.sandbox = 'allow-same-origin allow-scripts allow-forms';
    }
  }

  sendMessageToChild(action) {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(
        JSON.stringify({
          type: 'GOING',
          action,
        }),
        this.origin
      );
    }
  }

  ping() {
    const actions = window.goingQ || [];

    if (actions.length < 1) {
      this.pong();
    } else {
      this.iterator = 0;

      setTimeout(() => {
        this.sendNextAction();
      }, 0);
    }
  }

  pong() {
    window.goingQ = [];

    this.sendMessageToChild({
      type: 'PONG',
    });
  }

  setCurrentUrl() {
    this.sendMessageToChild({
      type: 'SET_CURRENT_URL',
      payload: {
        href: window.location.href,
        search: window.location.search,
      },
    });
  }

  sendNextAction() {
    if (this.iterator < window.goingQ.length) {
      this.sendMessageToChild(window.goingQ[this.iterator]);

      this.iterator++;

      setTimeout(() => {
        this.sendNextAction();
      }, 0);
    } else {
      if (!this.goingFunctionReplaced) {
        this.pong();

        this.replaceGoingWithInteractiveFunction();
      }
    }
  }

  sendIframeParentViewportHeightAndScrollPos() {
    try {
      const scrollPosY =
        window.top.scrollY !== undefined
          ? window.top.scrollY
          : window.top.pageYOffset ||
            window.top.document.documentElement.scrollTop;

      const payload = {
        viewportHeight: window.top.innerHeight,
        scrollPosY,
      };

      this.sendMessageToChild({
        type: 'SEND_IFRAME_PARENT_VIEWPORT_HEIGHT_AND_SCROLL_POS',
        payload,
      });
    } catch (error) {
      console.error(
        'Unable to access parent scroll position or viewport height:',
        error
      );
    }
  }

  sendIframeRelativeScrollPosition() {
    // TODO: change name to sendModalPosition in all places when there's space
    if (this.iframe) {
      const iframeTopOffset = this.iframe.offsetTop;
      const scrollFromTop = window.top.scrollY;
      const halfOfViewport = window.top.innerHeight / 2; // TODO: remove .top

      const payload = scrollFromTop - iframeTopOffset + halfOfViewport;

      this.sendMessageToChild({
        type: 'SEND_IFRAME_RELATIVE_SCROLL_POSITION',
        payload,
      });
    }
  }

  blockScrollWhenDialogVisible(isVisible) {
    const html = window.top.document.documentElement;
    const iframe = this.iframe;
    const wasOpen = this.auxiliaryState.wasOpen;

    const visible = isVisible === true || isVisible === 'true';

    if (visible) {
      const scrollPosY =
        window.top.scrollY !== undefined
          ? window.top.scrollY
          : window.top.pageYOffset ||
            window.top.document.documentElement.scrollTop;
      if (scrollPosY) {
        this.setLastScrollPos(scrollPosY);
      }
      html.style.overflow = 'hidden';
      iframe.style.position = 'fixed';
      iframe.style.zIndex = '99999';
      iframe.style.top = scrollPosY || 0 + 'px';
      iframe.style.transition = '0.1';
      this.setWasOpen(true);
    } else if (!visible && wasOpen) {
      html.style.overflow = 'scroll';
      iframe.style.position = '';
      iframe.style.zIndex = '';
      iframe.style.top = '';
      iframe.style.transition = '';
      const lastScrollPosY = this.auxiliaryState.lastScrollPosY;
      if (lastScrollPosY) {
        setTimeout(() => {
          window.top.scrollTo({ top: lastScrollPosY });
        }, 1);
      }
      this.setLastScrollPos(null);
      this.setWasOpen(false);
    }
  }

  sendLoaderPositionTop() {
    const iframeHeight = this.iframe.offsetHeight;
    const positionTopIframe = this.iframe.offsetTop;
    const positionBottomIframe = iframeHeight + positionTopIframe;
    const screenCenter = window.screen.height / 2;
    const scrollTopPosition = window.pageYOffset;
    const middleScrollPosition = scrollTopPosition + screenCenter;

    const loaderHeight = 200;
    const loaderHalfHeight = loaderHeight / 2;

    const isScrollOverIframe =
      middleScrollPosition < positionTopIframe + loaderHalfHeight;
    const isScrollUnderIframe =
      middleScrollPosition > positionBottomIframe - loaderHeight;

    let loaderPosition =
      middleScrollPosition - positionTopIframe - loaderHalfHeight;

    if (isScrollOverIframe) {
      loaderPosition = 0;
    } else if (isScrollUnderIframe) {
      loaderPosition = iframeHeight - loaderHeight;
    }

    this.sendMessageToChild({
      type: 'LOADER_POSITION_TOP',
      payload: loaderPosition,
    });
  }

  scrollToIframeTop() {
    if (this.iframe) {
      const positionTopIframe = this.iframe.offsetTop;
      window.scrollTo(0, positionTopIframe);
    }
  }

  sendPositionTop() {
    const scrollTopPosition = window.pageYOffset;
    this.sendMessageToChild({
      type: 'POSITION_TOP',
      payload: scrollTopPosition,
    });

    this.scrollToIframeTop();
  }

  setBasketData(payload) {
    window.localStorage.setItem('GOING_BASKET_ITEMS', payload);
  }

  replaceGoingWithInteractiveFunction() {
    this.goingFunctionReplaced = true;

    window.going = () => {
      [].push.apply(window.goingQ, arguments);

      this.iterator = 0;

      this.sendNextAction();
    };
  }

  resizeIframe(event) {
    if (this.iframe) {
      this.iframe.style.height = event.detail;
    }
  }

  redirectIframe(event) {
    /**
     * Note: this name is misleading, as the method
     * actually redirects the iframe's parent to a url
     * provided in payload of the redirectParentTo action.
     **/
    this.activeSession = false;
    if (this.state.isInNestedIframe) window.top.location.href = event.detail;
    else document.location.href = event.detail;
  }

  scrollIframeTo(event) {
    function getPosition(el) {
      var x = 0,
        y = 0;

      while (el != null && (el.tagName || '').toLowerCase() != 'html') {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.parentElement;
      }
      return { x: parseInt(x, 10), y: parseInt(y, 10) };
    }

    if (this.iframe) {
      const positionTopIframe = this.iframe.offsetTop;

      if (event.detail && this.iframe.offsetTop) {
        window.scrollTo(0, positionTopIframe + Number(event.detail));
      } else if (
        this.iframe.getBoundingClientRect() &&
        this.iframe.getBoundingClientRect().top
      ) {
        window.scrollTo(0, getPosition(this.iframe).y + Number(event.detail));
      }
    }
  }

  setPositionTop(event) {
    if (!event.detail || event.detail === 0) {
      this.scrollToIframeTop();
    } else {
      window.scrollTo(0, event.detail);
    }
  }

  refreshPage() {
    this.activeSession = false;
    this.removeCloseListener();
  }

  redirectEventIframe(event) {
    const params = JSON.parse(event.detail);

    this.setEventSlug(params.eventSlug);
    this.setRundateSlug(params.rundateSlug);

    this.updateIframe();
  }

  addListeners() {
    document.addEventListener('goingResize', this.resizeIframe.bind(this));

    document.addEventListener('goingBuyingRedirect', (event) => {
      window.history.pushState(null, '', `?prevTransactionId=${event.detail}`);
    });

    document.addEventListener('goingRedirect', this.redirectIframe.bind(this));

    document.addEventListener('goingFbq', (event) => {
      if (event.detail && window.fbq) {
        const data = JSON.parse(event.detail);

        if (data && data.action && data.payload) {
          if (data.payload === 'Purchase') {
            if (this.state.transactionId) {
              const storageTransaction = localStorage.transactionId;

              if (storageTransaction !== this.state.transactionId) {
                localStorage.transactionId = this.state.transactionId;
                if (data.extraData) {
                  window.fbq(data.action, data.payload, data.extraData);
                } else {
                  window.fbq(data.action, data.payload);
                }
              }
            }
          } else {
            window.fbq(data.action, data.payload);
          }
        }
      }
    });

    document.addEventListener(
      'goingScrollIframeTo',
      this.scrollIframeTo.bind(this)
    );

    document.addEventListener('goingPing', this.ping.bind(this));

    document.addEventListener(
      'goingScrollToTop',
      this.scrollToIframeTop.bind(this)
    );

    document.addEventListener(
      'goingGetIframePosition',
      this.sendLoaderPositionTop.bind(this)
    );

    document.addEventListener(
      'goingGetPositionTop',
      this.sendPositionTop.bind(this)
    );

    document.addEventListener('goingSetBasketData', (event) => {
      this.setBasketData(event.detail);
    });

    document.addEventListener(
      'goingSetPositionTop',
      this.sendPositionTop.bind(this)
    );

    document.addEventListener(
      'goingGetCurrentUrl',
      this.setCurrentUrl.bind(this)
    );

    document.addEventListener('goingRefreshPage', this.refreshPage.bind(this));

    document.addEventListener('goingSetSession', () => {
      // this.activeSession = true;
      // this.addCloseListener();
    });
    document.addEventListener(
      'goingRedirectEventIframe',
      this.redirectEventIframe.bind(this)
    );

    document.addEventListener(
      'goingGetIframeRelativeScrollPosition',
      this.sendIframeRelativeScrollPosition.bind(this)
    );

    document.addEventListener(
      'goingGetNestedIframeLayoutData',
      this.sendIframeParentViewportHeightAndScrollPos.bind(this)
    );

    document.addEventListener('goingGetNestedIframeLayoutData', (event) =>
      this.toggleScrollPositionCheck(event.detail)
    );

    document.addEventListener('goingBlockScrollWhenDialogVisible', (event) =>
      this.blockScrollWhenDialogVisible(event.detail)
    );

    window.addEventListener('scroll', this.sendIframeRelativeScrollPosition);
  }
}

window.GoingVersion = '1.0.30';
window.GoingService = window.GoingService || new Going();
window.GoingService.run();

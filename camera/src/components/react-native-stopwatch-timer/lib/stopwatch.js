import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';


class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      stopTime: null,
      lap: false,
      RSTime: null,
      LSTime: null,
      pausedTime: null,
      started: false,
      elapsed: null,
      final: null,
      fright: null,
      fleft: null,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    const width = props.msecs ? 220 : 150;
    this.defaultStyles = {
      container: {
        backgroundColor: 'rgba(0,0,0,.5)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: 130,
        height: 60,
        borderRadius: 5
      },
      elapsedContainer: {
        width: 130,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
      lapContainer: {
        width: 80,
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
      text: {
        fontSize: 21,
        opacity: 1,
        color: '#fff',
      },
      lap: {
        fontSize: 13,
        opacity: 1,
        color: '#fff',
      },
      width18: {
        width: 18
      },
      width5: {
        width: 5
      },
      width30: {
        width: 30
      },
      width45: {
        width: 45
      },
      width10: {
        width: 10
      },
    };
  }

  componentDidMount() {
    if(this.props.start) {
      this.start();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.start) {
      this.start();
    } else {
      this.stop();
    }
    if(newProps.lap) {
      this.state.lap = true;
      this.start();
    } else {
      this.state.lap = false;
    }
    if(newProps.reset) {
      this.reset();
    }
  }

  componentWillUnmount() {
     clearInterval(this.interval);
  }

  start() {
    if (this.props.laps && this.state.elapsed) {
      clearInterval(this.interval2);
      this.interval2 = null;
      this.setState({
        stopTime: null,
      })
    }

    if(this.state.lap) {
      this.interval2 = setInterval(() => {
        this.setState({LSTime: this.state.elapsed - this.state.RSTime})
      }, 1);
    } else {
      this.setState({startTime: this.state.elapsed ? new Date() - this.state.elapsed :
        new Date(), started: true});
      this.interval2 = setInterval(() => {
          this.setState({RSTime: this.state.elapsed});
      }, 1);
    }

    this.interval = this.interval ? this.interval : setInterval(() => {
        this.setState({elapsed: new Date() - this.state.startTime});
    }, 1);


  }

  stop() {
    this.setState({started: false});
    this.formatFinal();
    if(this.interval) {
      if (this.props.laps) {
        clearInterval(this.interval2);
        this.interval2 = null;
      }
      clearInterval(this.interval);
      this.interval = null;

    }
  }

  reset() {
    clearInterval(this.interval2);
    this.interval2 = null;
    clearInterval(this.interval);
    this.interval = null;

    this.setState({elapsed: null, startTime: null, stopTime: null, RSTime: null, LSTime: null});
  }

  formatFinal() {
      let elapsed = this.state.elapsed;

      let msecs = elapsed % 1000;
      let hundred = Math.floor(msecs / 100);
      let ten = Math.floor((msecs % 100) / 10);
      let one = Math.floor((msecs % 100) % 10);

      msecs = `${hundred}${ten}${one}`;

      let seconds = Math.floor(elapsed / 1000);
      let minutes = Math.floor(elapsed / 60000);
      let hours = Math.floor(elapsed / 3600000);
      seconds = seconds - (minutes * 60);
      minutes = minutes - (hours * 60);

      let s_ten;
      let s_one;
      if(seconds < 10) {
          s_ten = 0;
          s_one = seconds;
      } else {
          s_ten = Math.floor(seconds / 10);
          s_one = Math.floor(seconds % 10);
      }

      let m_ten;
      let m_one;
      if(minutes < 10) {
          m_ten = 0;
          m_one = minutes;
      } else {
          m_ten = Math.floor(minutes / 10);
          m_one = Math.floor(minutes % 10);
      }

      seconds = `${s_ten}${s_one}`;
      minutes = `${m_ten}${m_one}`;

      let rs = this.state.RSTime;

      let rsmsecs = rs % 1000;
      let rshundred = Math.floor(rsmsecs / 100);
      let rsten = Math.floor((rsmsecs % 100) / 10);
      let rsone = Math.floor((rsmsecs % 100) % 10);

      rsmsecs = `${rshundred}${rsten}${rsone}`;

      let rsseconds = Math.floor(rs / 1000);
      let rsminutes = Math.floor(rs / 60000);
      let rshours = Math.floor(rs / 3600000);
      rsseconds = rsseconds - (rsminutes * 60);
      rsminutes = rsminutes - (rshours * 60);

      let rss_ten;
      let rss_one;
      if(rsseconds < 10) {
          rss_ten = 0;
          rss_one = rsseconds;
      } else {
          rss_ten = Math.floor(rsseconds / 10);
          rss_one = Math.floor(rsseconds % 10);
      }

      let rsm_ten;
      let rsm_one;
      if(rsminutes < 10) {
          rsm_ten = 0;
          rsm_one = rsminutes;
      } else {
          rsm_ten = Math.floor(rsminutes / 10);
          rsm_one = Math.floor(rsminutes % 10);
      }

      rsseconds = `${rss_ten}${rss_one}`;
      rsminutes = `${rsm_ten}${rsm_one}`;

      let ls = this.state.LSTime;

      let lsmsecs = ls % 1000;
      let lshundred = Math.floor(lsmsecs / 100);
      let lsten = Math.floor((lsmsecs % 100) / 10);
      let lsone = Math.floor((lsmsecs % 100) % 10);

      lsmsecs = `${lshundred}${lsten}${lsone}`;

      let lsseconds = Math.floor(ls / 1000);
      let lsminutes = Math.floor(ls / 60000);
      let lshours = Math.floor(ls / 3600000);
      lsseconds = lsseconds - (lsminutes * 60);
      lsminutes = lsminutes - (lshours * 60);

      let lss_ten;
      let lss_one;
      if(lsseconds < 10) {
          lss_ten = 0;
          lss_one = lsseconds;
      } else {
          lss_ten = Math.floor(lsseconds / 10);
          lss_one = Math.floor(lsseconds % 10);
      }

      let lsm_ten;
      let lsm_one;
      if(lsminutes < 10) {
          lsm_ten = 0;
          lsm_one = lsminutes;
      } else {
          lsm_ten = Math.floor(lsminutes / 10);
          lsm_one = Math.floor(lsminutes % 10);
      }

      lsseconds = `${lss_ten}${lss_one}`;
      lsminutes = `${lsm_ten}${lsm_one}`;

      final = `${minutes}:${seconds}:${msecs}`;
      right = `RS: ${rsminutes}:${rsseconds}:${rsmsecs} `;
      left = `LS: ${lsminutes}:${lsseconds}:${lsmsecs} `;

      if (typeof this.props.getTime === "function") {
          this.props.getTime(final, right, left);
      }
  }

  formatTime() {
    let now = this.state.elapsed;

    let msecs = now % 1000;
    let hundred = Math.floor(msecs / 100);
    let ten = Math.floor((msecs % 100) / 10);
    let one = Math.floor((msecs % 100) % 10);

    msecs = `${hundred}${ten}${one}`;

    let seconds = Math.floor(now / 1000);
    let minutes = Math.floor(now / 60000);
    let hours = Math.floor(now / 3600000);
    seconds = seconds - (minutes * 60);
    minutes = minutes - (hours * 60);

    let s_ten;
    let s_one;
    if(seconds < 10) {
      s_ten = 0;
      s_one = seconds;
    } else {
      s_ten = Math.floor(seconds / 10);
      s_one = Math.floor(seconds % 10);
    }

    let m_ten;
    let m_one;
    if(minutes < 10) {
      m_ten = 0;
      m_one = minutes;
    } else {
      m_ten = Math.floor(minutes / 10);
      m_one = Math.floor(minutes % 10);
    }

    seconds = `${s_ten}${s_one}`
    minutes = `${m_ten}${m_one}`

    const styles = this.defaultStyles;

    return (
      <View style={styles.elapsedContainer}>
        <View style={styles.width30}>
          <Text style={styles.text}>{minutes}</Text>
        </View>
        <View style={styles.width10}>
          <Text style={styles.text}>:</Text>
        </View>
        <View style={styles.width30}>
          <Text style={styles.text}>{seconds}</Text>
        </View>
        <View style={styles.width10}>
          <Text style={styles.text}>:</Text>
        </View>
        <View style={styles.width45}>
          <Text style={styles.text}>{msecs}</Text>
        </View>
      </View>
    );

  }

  formatLapTime(time, side) {
    let now = time;

    let msecs = now % 1000;
    let hundred = Math.floor(msecs / 100);
    let ten = Math.floor((msecs % 100) / 10);
    let one = Math.floor((msecs % 100) % 10);

    msecs = `${hundred}${ten}${one}`

    let seconds = Math.floor(now / 1000);
    let minutes = Math.floor(now / 60000);
    let hours = Math.floor(now / 3600000);
    seconds = seconds - (minutes * 60);
    minutes = minutes - (hours * 60);

    let s_ten;
    let s_one;
    if(seconds < 10) {
      s_ten = 0;
      s_one = seconds;
    } else {
      s_ten = Math.floor(seconds / 10);
      s_one = Math.floor(seconds % 10);
    }

    let m_ten;
    let m_one;
    if(minutes < 10) {
      m_ten = 0;
      m_one = minutes;
    } else {
      m_ten = Math.floor(minutes / 10);
      m_one = Math.floor(minutes % 10);
    }

    seconds = `${s_ten}${s_one}`
    minutes = `${m_ten}${m_one}`


    const styles = this.defaultStyles;

    return (
      <View style={styles.lapContainer}>
        <View style={styles.width30}>
          <Text style={styles.lap}>{side}:</Text>
        </View>
        <View style={styles.width18}>
          <Text style={styles.lap}>{minutes}</Text>
        </View>
        <View style={styles.width5}>
          <Text style={styles.lap}>:</Text>
        </View>
        <View style={styles.width18}>
          <Text style={styles.lap}>{seconds}</Text>
        </View>
        <View style={styles.width5}>
          <Text style={styles.lap}>:</Text>
        </View>
        <View style={styles.width30}>
          <Text style={styles.lap}>{msecs}</Text>
        </View>
      </View>
    );
  }


  render() {
    const styles = this.defaultStyles;

    return(
      <View ref="stopwatch" style={styles.container}>
        <Text>{this.formatTime()}</Text>
        <Text>{this.formatLapTime(this.state.RSTime, 'RS')}</Text>
        <Text>{this.formatLapTime(this.state.LSTime, 'LS')}</Text>
      </View>
    );
  }
}

export default StopWatch;

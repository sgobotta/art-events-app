import React from 'react';
import {
  Image,
  ListView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import magazines from '../fixtures/events.json'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const styles = StyleSheet.create({
  item: {
    fontSize: 12
  }
})

export default class ExampleComponent extends React.Component {
  static navigationOptions = {
    title: 'Events',
  };

  state = {
    dataSource: ds.cloneWithRows(magazines),
    canLoadMoreContent: true,
  }

  _renderRefreshControl() {
    // Reload all data
    return (
      <RefreshControl
        refreshing={true}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    );
  }

  async componentWillMount() {
    this.setState({
      rawDataSource: magazines
    })
  }

  _loadMoreContentAsync = async () => {
    // Fetch more data here.
    // After fetching data, you should update your ListView data source
    // manually.
    // This function does not have a return value.
    console.log('load more content async')
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const newRows = [
      {
        "id": 158217,
        "name": "Oamoi noch dadst Au Bladl.",
        "issue": "#1184",
        "publisher": "Vue Admin aspera iaspis Deandlgwand fensdaln mogsd."
      }
    ]
    // console.log('rows', rows.length)
    const rawDataSource = this.state.rawDataSource.concat(newRows)
    this.setState({
      rawDataSource
    })
    console.log('Rows', rawDataSource.length)
    const ids = rawDataSource.map((row, index) => index)
    this.setState({
      dataSource: ds.cloneWithRows(rawDataSource, ids)
    });
  }

  renderRow(item) {
    const { id, issue, name, publisher } = item
    return (
      <React.Fragment>
        <Text style={styles.item}>ID: {id}</Text>
        <Text style={styles.item}>Name: {name}</Text>
        <Text style={styles.item}>Issue: {issue}</Text>
        <Text style={styles.item}>Publisher: {publisher}</Text>
      </React.Fragment>
    )
  }

  render() {
    const { dataSource } = this.state
    if (dataSource) {
      return (
        <ListView
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={dataSource}
          renderRow={this.renderRow}
          canLoadMore={this.state.canLoadMoreContent}
          onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
        />
      );
    }
    return null
  }
}

import { Badge, Text, List, HStack } from 'native-base';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: '#f2f2f2' }}
    >
      <List style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <HStack>
          <TouchableOpacity
            key={1}
            onPress={() => {
              props.categoryFilter('all'), props.setActive(-1);
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                props.active == -1 ? styles.active : styles.inactive,
              ]}
            >
              <Text style={{ color: 'white' }}>All</Text>
            </Badge>
          </TouchableOpacity>
          {props.categories.map((item) => (
            <TouchableOpacity
              key={item._id.$oid}
              onPress={() => {
                props.categoryFilter(item._id.$oid),
                  props.setActive(props.categories.indexOf(item));
              }}
            >
              <Badge
                style={[
                  styles.center,
                  { margin: 5 },
                  props.active == props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                <Text style={{ color: 'white' }}>{item.name}</Text>
              </Badge>
            </TouchableOpacity>
          ))}
        </HStack>
      </List>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#03bafc',
  },
  inactive: {
    backgroundColor: '#a0e1eb',
  },
});

export default CategoryFilter;

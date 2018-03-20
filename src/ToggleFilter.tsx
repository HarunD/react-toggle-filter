import React from 'react';

import './style.css';

interface FilterableItem {
    title : string,
    isSelected : boolean
}
type FilterableList = Array < FilterableItem > | null;
type StringList = Array < string >;

interface ToggleFilterProps {
    className? : string;
    items : StringList;
    itemClassName? : string;
    onItemToggle : Function;
    selected : StringList;
    style? : object;
}

interface ToggleFilterState {
    filterableItems : FilterableList;
}

export default class ToggleFilter extends React.Component<ToggleFilterProps,ToggleFilterState> {
    public static defaultProps : Partial<ToggleFilterProps> = {
        items: [],
        selected: []
    }

    constructor(props : ToggleFilterProps) {
        super(props);
        this.state = {
            filterableItems: this._getFilterableItems(props.items, props.selected)
        };
    }

    // shouldComponentUpdate*

    // Create an object of provided filterable items
    _getFilterableItems = (allItems : StringList, selectedItems : StringList) : FilterableList | null => {
        if (!allItems || allItems.length === 0) {
            return null;
        }

        let filterable : Array < FilterableItem > = [];
        allItems.forEach((i : string) => {
            filterable.push({title: i, isSelected: false});
        });

        return filterable;
    }

    // Toggle the isSelected state of an item
    _toggleItem = (index : number, item : FilterableItem) => {
        let filterableItems : FilterableList = this.state.filterableItems;
        if (!filterableItems) {
            return;
        }

        filterableItems[index].isSelected = !item.isSelected;
        this.setState({
            filterableItems
        }, () => {
            let selectedItems : StringList = [];
            if (filterableItems && filterableItems.length > 0) {
                selectedItems = filterableItems.filter((item : FilterableItem) => item.isSelected).map((item : FilterableItem) => item.title);
            }

            this
                .props
                .onItemToggle(selectedItems, filterableItems);
        });
    }

    render() {
        let filterableItems : FilterableList = this.state.filterableItems;

        if (!filterableItems) {
            return null;
        }

        return (
            <section
                className={`ToggleFilter ${this.props.className}`}
                style={this.props.style}>
                {filterableItems.map((item : FilterableItem, index : number) => (
                    <span
                        key={index}
                        className={`ToggleFilter__Item ${this.props.itemClassName} ${item.isSelected
                        ? '--is-selected'
                        : ''}`}
                        onClick={() => this._toggleItem(index, item)}>{item.title}</span>
                ))}
            </section>
        );
    }
}
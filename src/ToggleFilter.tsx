/*
    TODO:
    - possibility to send objects as ItemList, eg. [{title: 'Active', status: 0}, {title: 'Closed', status: 1}]
*/
import React from 'react';

import './style.css';

interface FilterableItem {
    isSelected : boolean;
    title : string;
    value?: string | number;
}
type FilterableList = Array < FilterableItem > | null;
type ItemList = Array < string >;

interface ToggleFilterProps {
    className?: string;
    itemClassName?: string;
    items : ItemList;
    onItemToggle : Function;
    selected : ItemList;
    style?: object;
}

interface ToggleFilterState {
    filterableItems : FilterableList;
}

export default class ToggleFilter extends React.Component < ToggleFilterProps,
ToggleFilterState > {
    public static defaultProps : Partial < ToggleFilterProps > = {
        items: [],
        selected: []
    }

    constructor(props : ToggleFilterProps) {
        super(props);
        this.state = {
            filterableItems: this._getFilterableItems(props.items, props.selected)
        };
    }

    componentDidUpdate(prevProps : any, prevState : any) {
        this._fireToggle(this.state.filterableItems);
    }

    // Fire the update event
    _fireToggle = (filterableItems : FilterableList) => {
        let selectedItems : ItemList = [];

        if (filterableItems && filterableItems.length > 0) {
            selectedItems = filterableItems.filter((item : FilterableItem) => item.isSelected).map((item : FilterableItem) => item.title);
        }

        this
            .props
            .onItemToggle(selectedItems, filterableItems);
    }

    // Create an array of provided filterable items
    _getFilterableItems = (allItems : ItemList, selectedItems : ItemList) : FilterableList | null => {
        if (!allItems || allItems.length === 0) {
            return null;
        }

        let filterable : Array < FilterableItem > = [];
        allItems.forEach((i : string) => {
            filterable.push({
                title: i,
                value: i.split(' ').join('_').toLowerCase(),
                isSelected: selectedItems.includes(i)
            });
        });

        return filterable;
    }

    _toggleItem = (index : number, item : FilterableItem) => {
        let filterableItems : FilterableList = this.state.filterableItems;
        if (!filterableItems) {
            return;
        }

        filterableItems[index].isSelected = !item.isSelected;
        this.setState({filterableItems});
    }

    render() {
        let filterableItems : FilterableList = this.state.filterableItems;
        if (!filterableItems) {
            return null;
        }

        let {className, style, itemClassName} = this.props;

        return (
            <section
                className={`ToggleFilter ${className
                ? className
                : ''}`}
                style={style}>
                {filterableItems.map((item : FilterableItem, index : number) => (<FilterableItem
                    key={index}
                    item={item}
                    itemClassName={itemClassName}
                    onClick={() => this._toggleItem(index, item)}/>))}
            </section>
        );
    }
}

// FilterableItem component
type FilterableItemProps = {
    itemClassName: string | undefined;
    item: FilterableItem;
    onClick: any;
}

const FilterableItem = (props : FilterableItemProps) => {
    let {item, itemClassName, onClick} = props;

    return (
        <span            
            className={`ToggleFilter__Item ${item.value} ${itemClassName
            ? itemClassName
            : ''} ${item.isSelected
                ? 'selected'
                : ''}`}
            onClick={onClick}>{item.title}</span>
    );
};
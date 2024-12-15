import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed';

const SkeletonComponent = ({ width, height, circle, style }: any) => {
    return (
        <>
            {circle ? (
                <Skeleton circle width={width} height={height} style={[styles.skeleton, style]} />
            ) : (
                <Skeleton width={width} height={height} style={[styles.skeleton, style]} />
            )}
        </>

    )
}
const styles = StyleSheet.create({
    skeleton: {
        marginVertical: 8,
        borderRadius: 4,
    },
});

export default SkeletonComponent;